import { Component, OnInit, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router } from '@angular/router';
import moment from 'moment';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService, MainService, ModalService } from '../../../service/index';

@Component({
    selector: 'tt-main-list',
    templateUrl: 'client/modules/main/list/main-list.component.html',
    styleUrls: ['client/modules/main/list/main-list.component.css'],
    viewProviders: [DragulaService]
})

export class MainListComponent implements OnInit {
    private newDate: Object = {};
    private timetableList: any[] = [];

    constructor(
        private mainService: MainService,
        private apiService: ApiService,
        private fms: FlashMessagesService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.mainService
            .getTimeLesson()
            .subscribe(date => {
                this.timetableList = date;
            })
    }

    addDate(newDate: Object): void {
        this.mainService
            .addDate(newDate)
            .subscribe(data => {
                if (Object.keys(data).length > 0) {
                    this.timetableList.push(data);
                    this.newDate = {};
                } else {
                    this.fms.show('Ошибка', { cssClass: 'alert-error', timeout: 2000 });
                }
            },
            err => {
                this.fms.show('Ошибка', { cssClass: 'alert-error', timeout: 2000 });
            });
    }

    goItem(item: any): void{
        let id = item._id;
        this.router.navigate(['/main', id]);
    }
}