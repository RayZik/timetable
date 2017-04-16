import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'tt-list-teacher',
    templateUrl: 'client/modules/teacher/list/list.component.html'
})

export class TeacherListComponent implements OnInit {

    teacherList: any[];
    private teacher: any = {};

    constructor(private teacherService: ApiService, private router: Router) { }
    ngOnInit() {
        this.refresh();
    }

    goTeacherId(id: any) {
        this.router.navigate(['/teacher', id]);
    }

    newTeacher(teacher) {
        this.teacherService
            .createTeacher(teacher)
            .subscribe();
        this.refresh();
    }

    deleteTeacher(id) {
        this.teacherService
            .deleteTeacher(id)
            .subscribe();
        this.refresh();
    }

    refresh() {
        this.teacherService
            .getTeachers()
            .subscribe(
            (data) => { this.teacherList = data; },
            (err) => console.log(err)
            );
    }
}