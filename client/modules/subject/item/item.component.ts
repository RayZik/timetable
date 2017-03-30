import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
    selector: 'tt-list-subject',
    templateUrl: "client/modules/subject/item/item.component.html"
})

export class SubjectItemComponent implements OnInit {

    private subject: any = {};

    constructor(
        private subjectService: ApiService,
        private router: ActivatedRoute,
        private rout: Router,
        private location: Location) { }

    ngOnInit() {
        this.router.params.forEach((params: Params) => {
            this.subjectService
                .getSubject(params.id)
                .subscribe((data) => { this.subject = data; });
        });
    }

    updateSubject(subject: any) {
        this.subjectService
            .updateSubject(subject)
            .subscribe();
        this.rout.navigate(['/subject']);
    }

    goBack(): void {
        this.location.back();
    }
}