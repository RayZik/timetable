import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from '@angular/common';

@Component({
    selector: 'tt-list-group',
    templateUrl: "client/modules/group/item/item.component.html",
    providers: [ApiService]
})

export class GroupItemComponent implements OnInit {

    private group: any = {};

    constructor(
        private groupService: ApiService,
        private router: ActivatedRoute,
        private location: Location) { }

    ngOnInit() {
        this.router.params.forEach((params: Params) => {
            this.groupService
                .getGroup(params.id)
                .subscribe((data) => { this.group = data; });
        });
    }

    updateGroup(group: any) {
        this.groupService
            .updateGroup(group)
            .subscribe();
    }

    goBack(): void {
        this.location.back();
    }
}