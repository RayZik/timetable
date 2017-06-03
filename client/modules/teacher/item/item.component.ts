import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../../../service/index';

@Component({
    selector: 'tt-list-teacher',
    templateUrl: 'client/modules/teacher/item/item.component.html'
})

export class TeacherItemComponent implements OnInit {
    private teacher: Object = {};

    constructor(
        private apiService: ApiService,
        private activedRouter: ActivatedRoute,
        private router: Router,
        private location: Location) { }

    ngOnInit() {
        this.activedRouter.params.forEach((params: Params) => {
            this.apiService
                .getTeacher(params.id)
                .subscribe((data) => { this.teacher = data; });
        });
    }

    updateTeacher(teacher: any): void {
        this.apiService
            .updateTeacher(teacher)
            .subscribe();
        this.router.navigate(['/teacher']);
    }

    goBack(): void {
        this.location.back();
    }
}