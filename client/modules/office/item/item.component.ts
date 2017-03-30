import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
    selector: 'tt-list-office',
    templateUrl: "client/modules/office/item/item.component.html"
})

export class OfficeItemComponent implements OnInit {

    private office: any = {};

    constructor(
        private officeService: ApiService,
        private router: ActivatedRoute,
        private rout: Router,
        private location: Location) { }

    ngOnInit() {
        this.router.params.forEach((params: Params) => {
            this.officeService
                .getOffice(params.id)
                .subscribe((data) => { this.office = data; });
        });
    }

    updateOffice(office: any) {
        this.officeService
            .updateOffice(office)
            .subscribe();
        this.rout.navigate(['/office']);
    }

    goBack(): void {
        this.location.back();
    }
}