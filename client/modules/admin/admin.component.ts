import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
	selector: 'tt-admin',
	templateUrl: "client/modules/admin/admin.component.html",
	providers: [AdminService]
})

export class AdminComponent implements OnInit {
	private counter: number = 0;
	private timetable: any[] = [];
	private items: any = {};

	constructor(private adminService: AdminService) { }
	ngOnInit() {
		this.adminService
			.getTimetable()
			.subscribe(
			(data) => { this.timetable.push(data); },
			(err) => console.log(err)
			);
	}

	updateTable(timetable: any) {
		this.items = timetable[0];
		this.adminService
			.updateTable(this.items)
			.subscribe(
			(data) => { console.log(data) },
			(err) => console.log(err)
			);
	}
}