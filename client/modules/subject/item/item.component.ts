import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { FlashMessagesService } from 'angular2-flash-messages';
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
        private fms: FlashMessagesService,
        private location: Location) { }

    ngOnInit() {
        this.activedRouter.params.forEach((params: Params) => {
            if (params.id) {
                this.apiService
                    .getSubject(params.id)
                    .subscribe((data) => {
                        if (!data.status) {
                            this.subject = data;
                        }
                    });
            }
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