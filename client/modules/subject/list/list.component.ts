import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from "angular2-flash-messages";
import { ApiService } from '../../../service/index';

@Component({
    selector: 'tt-list-subject',
    templateUrl: 'client/modules/subject/list/list.component.html'
})

export class SubjectListComponent implements OnInit {
    private subjectList: any[] = [];
    private subject: Object = {};

    constructor(
        private apiService: ApiService,
        private router: Router,
        private fms: FlashMessagesService, ) { }

    ngOnInit(): void {
        this.apiService
            .getSubjects()
            .subscribe(
            (data) => {
                if (!data.status) {
                    this.subjectList = data;
                }
            });
    }

    goSubjectId(id: string): void {
        if (!!id) {
            this.router.navigate(['/subject', id]);
        }
    }

    addSubject(subject: Object): void {
        if (subject['name']) {
            this.apiService
                .createSubject(subject)
                .subscribe(data => {
                    if (Object.keys(data).length > 0) {
                        this.subjectList.push(data);
                        this.subject = {};
                    }
                },
                err => {
                    this.fms.show('Имя уже существует', { cssClass: 'alert-error', timeout: 2000 });
                });
        } else {
            this.fms.show('Введите имя предмета', { cssClass: 'alert-error', timeout: 2000 });
        }
    }

    deleteSubject(id: string): void {
        if (!!id) {
            this.apiService
                .deleteSubject(id)
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
        let list: any[] = this.subjectList;

        if (list.length > 0) {
            let filteredList = list.filter((val) => {
                return val._id !== id;
            })
            this.subjectList = filteredList;
        }
    }
}