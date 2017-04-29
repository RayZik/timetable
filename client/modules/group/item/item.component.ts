import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

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
        private location: Location) { }

    ngOnInit() {
        this.activatedRouter.params.forEach((params: Params) => {
            this.apiService
                .getGroup(params.id)
                .subscribe((data) => { this.group = data; });
        });
    }

    updateGroup(group: any): void {
        this.apiService
            .updateGroup(group)
            .subscribe();
        this.router.navigate(['/group']);
    }

    goBack(): void {
        this.location.back();
    }
}