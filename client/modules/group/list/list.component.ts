import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../service/index';

@Component({
    selector: 'tt-list-group',
    templateUrl: 'client/modules/group/list/list.component.html'
})

export class GroupListComponent implements OnInit {
    private groupList: any[] = [];
    private group: Object = {};

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        this.apiService
            .getGroups()
            .subscribe(
            (data) => { this.groupList = data; });
    }

    goGroupId(id: String): void {
        this.router.navigate(['/group', id]);
    }

    newGroup(group): void {
        this.apiService
            .createGroup(group)
            .subscribe();
    }

    deleteGroup(id: String): void {
        this.apiService
            .deleteGroup(id)
            .subscribe();
    }
}
