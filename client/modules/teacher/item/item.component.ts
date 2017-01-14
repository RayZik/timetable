import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
    selector: 'tt-list-teacher',
    templateUrl: "client/modules/teacher/item/item.component.html",
    providers: [ApiService]
})

export class TeacherItemComponent implements OnInit {

    private teacher: any = {};

    constructor(
        private teacherService: ApiService,
        private router: ActivatedRoute,
        private rout: Router,
        private location: Location) { }

    ngOnInit() {
        this.router.params.forEach((params: Params) => {
            this.teacherService
                .getTeacher(params.id)
                .subscribe((data) => { this.teacher = data; });
        });
    }

    updateTeacher(teacher: any) {
        this.teacherService
            .updateTeacher(teacher)
            .subscribe();
        this.rout.navigate(['/teacher']);
    }

    goBack(): void {
        this.location.back();
    }
}