import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from './admin.service';
import { ApiService } from '../../service/api.service';

@Component({
	selector: 'tt-admin',
	templateUrl: "client/modules/admin/admin.component.html",
	providers: [AdminService, ApiService],
})

export class AdminComponent implements OnInit {
	private counter: number = 0;
	private timetable: any[] = [];
	private teachers: any[];
	// @Input() teachers:any[];

	constructor(private adminService: AdminService, private apiService: ApiService) { }

	ngOnInit() {
		this.refresh();
		this.apiService
			.getTeachers()
			.subscribe(
			(data) => { this.teachers = data; },
			(err) => console.log(err)
			);
	}

	addTT(id) {
		this.adminService
			.addTT(id)
			.subscribe(
			(data) => { console.log(data) },
			(err) => console.log(err)
			);
	}

	refresh() {
		this.adminService
			.getTimetable()
			.subscribe(
			(data) => { this.timetable.push(data); },
			(err) => console.log(err)
			);
	}
}