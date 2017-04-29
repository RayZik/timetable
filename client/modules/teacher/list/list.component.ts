import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../service/index';

@Component({
    selector: 'tt-list-teacher',
    templateUrl: 'client/modules/teacher/list/list.component.html'
})

export class TeacherListComponent implements OnInit {

    teacherList: any[];
    private teacher: any = {};

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        this.apiService
            .getTeachers()
            .subscribe(
            (data) => { this.teacherList = data; });
    }

    goTeacherId(id: String) {
        this.router.navigate(['/teacher', id]);
    }

    newTeacher(teacher) {
        this.apiService
            .createTeacher(teacher)
            .subscribe();
    }

    deleteTeacher(id: String) {
        this.apiService
            .deleteTeacher(id)
            .subscribe();
    }
}