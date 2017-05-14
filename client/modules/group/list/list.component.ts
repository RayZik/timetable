import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from '../../../service/index';

@Component({
    selector: 'tt-list-group',
    templateUrl: 'client/modules/group/list/list.component.html',
    // styles:['.divider { border-bottom: 1px solid gray; }']
})

export class GroupListComponent implements OnInit {
    private groupList: any[] = [];
    private group: Object = {};

    constructor(
        private apiService: ApiService,
        private fms: FlashMessagesService,
        private router: Router) { }

    ngOnInit(): void {
        this.apiService
            .getGroups()
            .subscribe(
            (data) => {
                if (!data.status) {
                    this.groupList = data;
                }
            });
    }

    goGroupId(id: string): void {
        if (!!id) {
            this.router.navigate(['/group', id]);
        }
    }

    addGroup(group: Object, grpInput: any): void {
        if (group['name']) {
            this.apiService
                .createGroup(group)
                .subscribe(data => {
                    if (data !== {}) {
                        this.groupList.push(data);
                        grpInput.value = '';
                        this.group = {};
                    }
                },
                err => {
                    this.fms.show('Имя уже существует', { cssClass: 'alert-error', timeout: 2000 });
                });
        } else {
            this.fms.show('Введите имя группы', { cssClass: 'alert-error', timeout: 2000 });
        }
    }

    deleteGroup(id: string): void {
        if (!!id) {
            this.apiService
                .deleteGroup(id)
                .subscribe(data => {
                    if (data) {
                        this.deleteFromList(id);
                    } else {
                        this.fms.show('Невозможно удалить', { cssClass: 'alert-error', timeout: 2000 });
                    }
                },
                err => {
                    this.fms.show('Невозможно удалить', { cssClass: 'alert-error', timeout: 2000 });
                });
        }
    }

    deleteFromList(id: string) {
        let list: any[] = this.groupList;

        if (list.length > 0) {
            let filteredList = list.filter((val) => {
                return val._id !== id;
            })
            this.groupList = filteredList;
        }
    }
}
