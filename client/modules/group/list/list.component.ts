import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import {Router} from "@angular/router";

@Component({
    selector: 'tt-list-group',
    templateUrl: "client/modules/group/list/list.component.html",
    providers: [ApiService]
})

export class GroupListComponent implements OnInit {
    
    private groupList:any[] = [];

    constructor(private groupService: ApiService,private router: Router) { }
    ngOnInit() {
      	this.groupService
			.getGroups()
			.subscribe(
			(data) => { this.groupList = data; },
			(err) => console.log(err)
			);
    }

     goGroupId(id: any) {
        this.router.navigate(['/group', id]);
    }
}