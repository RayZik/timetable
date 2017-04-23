import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'tt-list-group',
    templateUrl: 'client/modules/group/item/item.component.html'
})

export class GroupItemComponent implements OnInit {

    private group: Object = {};

    constructor(
        private groupService: ApiService,
        private router: ActivatedRoute,
        private rout: Router,
        private location: Location) { }

    ngOnInit() {
        this.router.params.forEach((params: Params) => {
            this.groupService
                .getGroup(params.id)
                .subscribe((data) => { this.group = data; });
        });
    }

    updateGroup(group: any): void {
        this.groupService
            .updateGroup(group)
            .subscribe();
        this.rout.navigate(['/group']);
    }

    goBack(): void {
        this.location.back();
    }
}