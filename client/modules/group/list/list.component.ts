import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'tt-list-group',
    templateUrl: 'client/modules/group/list/list.component.html'
})

export class GroupListComponent implements OnInit {

    private groupList: any[] = [];
    private group: Object = {};


    constructor(private groupService: ApiService, private router: Router) { }
    ngOnInit() {
        this.refresh();
    }



    goGroupId(id: any): void {
        this.router.navigate(['/group', id]);
    }

    newGroup(group): void {
        this.groupService
            .createGroup(group)
            .subscribe();
        this.refresh();
    }

    deleteGroup(id): void {
        this.groupService
            .deleteGroup(id)
            .subscribe();
        this.refresh();
    }

    refresh(): void {
        this.groupService
            .getGroups()
            .subscribe(
            (data) => { this.groupList = data; },
            (err) => console.log(err)
            );
    }
}
