import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { Router } from "@angular/router";

@Component({
    selector: 'tt-list-office',
    templateUrl: "client/modules/office/list/list.component.html",
    providers: [ApiService]
})

export class OfficeListComponent implements OnInit {

    private officeList: any[] = [];
    private office: any = {};


    constructor(private officeService: ApiService, private router: Router) { }
    ngOnInit() {
        this.refresh();
    }

    goOfficeId(id: any) {
        this.router.navigate(['/office', id]);
    }

    newOffice(office) {
        this.officeService
            .createOffice(office)
            .subscribe();
        this.refresh();
    }

    deleteOffice(id) {
        this.officeService
            .deleteOffice(id)
            .subscribe();
        this.refresh();
    }

    refresh() {
        this.officeService
            .getOffices()
            .subscribe(
            (data) => { this.officeList = data; },
            (err) => console.log(err)
            );
    }
}