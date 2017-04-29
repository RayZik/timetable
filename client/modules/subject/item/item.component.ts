import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../../../service/index';

@Component({
    selector: 'tt-list-subject',
    templateUrl: 'client/modules/subject/item/item.component.html'
})

export class SubjectItemComponent implements OnInit {
    private subject: Object = {};

    constructor(
        private apiService: ApiService,
        private activedRouter: ActivatedRoute,
        private router: Router,
        private location: Location) { }

    ngOnInit() {
        this.activedRouter.params.forEach((params: Params) => {
            this.apiService
                .getSubject(params.id)
                .subscribe((data) => { this.subject = data; });
        });
    }

    updateSubject(subject: any): void {
        this.apiService
            .updateSubject(subject)
            .subscribe();
        this.router.navigate(['/subject']);
    }

    goBack(): void {
        this.location.back();
    }
}