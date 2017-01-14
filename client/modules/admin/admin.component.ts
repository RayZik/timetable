import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from './admin.service';
import { ApiService } from '../../service/api.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
	selector: 'tt-admin',
	templateUrl: "client/modules/admin/admin.component.html",
	providers: [AdminService, ApiService],
	viewProviders: [DragulaService]
})

export class AdminComponent implements OnInit {
	private cellTimetable: any[] = [];
	private lesson:any = {};
	constructor(private adminService: AdminService, private dragulaService: DragulaService) {
		dragulaService.setOptions('bag-one', {
			copy: true
		});
	}

	ngOnInit(): void {
		this.adminService
			.getCellTimetable()
			.subscribe(
			(data) => { this.cellTimetable = data; },
			(err) => console.log(err)
			);
	}

	addCell(): void {
		this.adminService
			.addCell()
			.subscribe();
	}

	newLesson(lesson) {
		this.adminService
			.addTimeLesson(lesson)
			.subscribe();
	}


}


