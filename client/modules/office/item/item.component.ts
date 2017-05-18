import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from '../../../service/index';

@Component({
    selector: 'tt-list-office',
    templateUrl: 'client/modules/office/item/item.component.html'
})

export class OfficeItemComponent implements OnInit {
    private office: Object = {};

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
                    .getOffice(params.id)
                    .subscribe((data) => {
                        if (!data.status) {
                            this.office = data;
                        }
                    });
            }
        });
    }

    updateOffice(office: any): void {
        if (office['name']) {
            this.apiService
                .updateGroup(office)
                .subscribe(data => {
                    if (data) {
                        this.router.navigate(['/office']);
                    } else {
                        this.fms.show('Невозможно изменить', { cssClass: 'alert-error', timeout: 2000 });
                    }
                });
        } else {
            this.fms.show('Введите имя', { cssClass: 'alert-error', timeout: 2000 });
        }
    }

    goBack(): void {
        this.location.back();
    }
}