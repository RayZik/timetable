import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AdminService } from '../../modules/admin/admin.service';
import { ApiService } from '../../service/api.service';
import moment from 'moment';

@Component({
    selector: 'tt-save-cell',
    templateUrl: "client/components/save-cell-timetable/save-cell.component.html",
    providers: [ApiService],
})

export class SaveCellComponent implements OnInit {
    @Output() onChanged = new EventEmitter<any>();
    @Input() dateList;

   

    constructor(private adminService: AdminService, private apiService: ApiService) { }

    ngOnInit(): void {
       
    }

   
}
