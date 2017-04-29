import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../service/index';

@Component({
    selector: 'tt-list-office',
    templateUrl: 'client/modules/office/list/list.component.html'
})

export class OfficeListComponent implements OnInit {
    private officeList: any[] = [];
    private office: Object = {};

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        this.apiService
            .getOffices()
            .subscribe(
            (data) => { this.officeList = data; });
    }

    goOfficeId(id: String) {
        this.router.navigate(['/office', id]);
    }

    newOffice(office) {
        this.apiService
            .createOffice(office)
            .subscribe();
    }

    deleteOffice(id: String) {
        this.apiService
            .deleteOffice(id)
            .subscribe();
    }
}