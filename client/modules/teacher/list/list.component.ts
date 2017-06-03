import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from "angular2-flash-messages";
import { ApiService } from '../../../service/index';

@Component({
    selector: 'tt-list-teacher',
    templateUrl: 'client/modules/teacher/list/list.component.html'
})

export class TeacherListComponent implements OnInit {

    private teacherList: any[] = [];
    private teacher: any = {};

    constructor(
        private apiService: ApiService,
        private fms: FlashMessagesService,
        private router: Router) { }

    ngOnInit() {
        this.apiService
            .getTeachers()
            .subscribe(
            (data) => {
                if (!data.status) {
                    this.teacherList = data;
                }
            }); 
    }

    goTeacherId(id: string): void {
        if (!!id) {
            this.router.navigate(['/teacher', id]);
        }
    }

    addTeacher(teacher: Object): void {
        if (teacher['name']) {
            this.apiService
                .createTeacher(teacher)
                .subscribe(data => {
                    if (Object.keys(data).length > 0) {
                        this.teacherList.push(data);
                        this.teacher = {};
                    }
                },
                err => {
                    this.fms.show('Уже существует', { cssClass: 'alert-error', timeout: 2000 });
                });
        } else {
            this.fms.show('Заполните поля', { cssClass: 'alert-error', timeout: 2000 });
        }
    }

    deleteTeacher(id: string): void {
        if (!!id) {
            this.apiService
                .deleteTeacher(id)
                .subscribe(data => {
                    if (data) {
                        this.deleteFromList(id);
                    } else {
                        this.fms.show('Невозможно удалить', { cssClass: 'alert-error', timeout: 2000 });
                    }
                },
                err => {
                    this.fms.show('Невозможно удалить', { cssClass: 'alert-error', timeout: 2000 });
                });
        }
    }

    deleteFromList(id: string): void {
        let list: any[] = this.teacherList;

        if (list.length > 0) {
            let filteredList = list.filter((val) => {
                return val._id !== id;
            })
            this.teacherList = filteredList;
        }
    }
}