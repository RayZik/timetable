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


	constructor(private adminService: AdminService) { }
	ngOnInit() {
		this.adminService
			.getTimetable()
			.subscribe(
			(data) => { this.timetable.push(data); },
			(err) => console.log(err)
			);
	}
}