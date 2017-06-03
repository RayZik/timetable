import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from "angular2-flash-messages";
import { ApiService } from '../../../service/index';

@Component({
    selector: 'tt-list-office',
    templateUrl: 'client/modules/office/list/list.component.html'
})

export class OfficeListComponent implements OnInit {
    private officeList: any[] = [];
    private office: Object = {};

    constructor(
        private apiService: ApiService,
        private fms: FlashMessagesService,
        private router: Router) { }

    ngOnInit() {
        this.apiService
            .getOffices()
            .subscribe(
            (data) => {
                if (!data.status) {
                    this.officeList = data;
                }
            });
    }

    goOfficeId(id: String): void {
        if (!!id) {
            this.router.navigate(['/office', id]);
        }
    }

    addOffice(office: Object): void {
        if (office['name']) {
            this.apiService
                .createOffice(office)
                .subscribe(data => {
                    if (Object.keys(data).length > 0) {
                        console.log(data)
                        this.officeList.push(data);
                        this.office = {};
                    }
                },
                err => {
                    this.fms.show('Имя уже существует', { cssClass: 'alert-error', timeout: 2000 });
                });
        } else {
            this.fms.show('Введите имя аудитории', { cssClass: 'alert-error', timeout: 2000 });
        }
    }

    deleteOffice(id: string): void {
        if (!!id) {
            this.apiService
                .deleteOffice(id)
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

    deleteFromList(id: string): void {
        let list: any[] = this.officeList;

        if (list.length > 0) {
            let filteredList = list.filter((val) => {
                return val._id !== id;
            })
            this.officeList = filteredList;
        }
    }
} 