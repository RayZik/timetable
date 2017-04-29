import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

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
        private location: Location) { }

    ngOnInit() {
        this.activedRouter.params.forEach((params: Params) => {
            this.apiService
                .getOffice(params.id)
                .subscribe((data) => { this.office = data; });
        });
    }

    updateOffice(office: any): void {
        this.apiService
            .updateOffice(office)
            .subscribe();
        this.router.navigate(['/office']);
    }

    goBack(): void {
        this.location.back();
    }
}