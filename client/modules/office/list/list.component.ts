import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import {Router} from "@angular/router";

@Component({
    selector: 'tt-list-office',
    templateUrl: "client/modules/office/list/list.component.html",
    providers: [ApiService]
})

export class OfficeListComponent implements OnInit {
    
    private officeList:any[] = [];

    constructor(private officeService: ApiService,private router: Router) { }
    ngOnInit() {
      	this.officeService
			.getOffices()
			.subscribe(
			(data) => { this.officeList = data; },
			(err) => console.log(err)
			);
    }

     goOfficeId(id: any) {
        this.router.navigate(['/office', id]);
    }
}