import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from '../../../service/index';

@Component({
    selector: 'tt-list-group',
    templateUrl: 'client/modules/group/item/item.component.html'
})

export class GroupItemComponent implements OnInit {
    private group: Object = {};

    constructor(
        private apiService: ApiService,
        private activatedRouter: ActivatedRoute,
        private router: Router,
        private fms: FlashMessagesService,
        private location: Location) { }

    ngOnInit(): void {
        this.activatedRouter.params.forEach((params: Params) => {
            if (params.id) {
                this.apiService
                    .getGroup(params.id)
                    .subscribe((data) => {
                        if (!data.status) {
                            this.group = data;
                        }
                    });
            }
        });
    }

    updateGroup(group: Object): void {
        if (group['name']) {
            this.apiService
                .updateGroup(group)
                .subscribe(data => {
                    if (data) {
                        this.router.navigate(['/group']);
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

