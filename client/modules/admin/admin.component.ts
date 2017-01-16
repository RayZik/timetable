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

	private cellTimetable: any = [];

	private timeList: any = [];

	private lesson: any = {};
	private newDate: any = {};
	private cellIdTime: any = {};


	constructor(private adminService: AdminService, private dragulaService: DragulaService) {
		dragulaService.dropModel.subscribe((value) => {
			this.onDropModel(value.slice(1));
		});

		dragulaService.removeModel.subscribe((value) => {
			this.onRemoveModel(value.slice(1));
		});
	}
	private onDropModel(args) {
		let [el, target, source] = args;
		// console.log(this.cellIdTime)
	}

	private onRemoveModel(args) {
		let [el, source] = args;
		// do something else
	}

	ngOnInit(): void {
		this.adminService
			.getCellTimetable()
			.subscribe(
			(data) => { this.cellTimetable = data; },
			(err) => console.log(err)
			);

		this.adminService
			.getTimeLesson()
			.subscribe(
			(data) => {
				for (var i = 0; i < data[0].lessons.length; i++) {
					this.timeList.push([data[0].lessons[i].begin, data[0].lessons[i].end, [[], [], [], [], [], [], []]]); console.log(this.timeList)
				}
			},
			(err) => console.log(err)
			);
	}

	addCell(): void {
		this.adminService
			.addCell()
			.subscribe();
		this.ngOnInit();
	}

	addLesson(lesson) {
		this.adminService
			.addTimeLesson(lesson)
			.subscribe();
		this.ngOnInit();

	}

	addDate(newDate) {
		this.adminService
			.addDate(newDate)
			.subscribe();
	}

	show(items) {
		console.log(items)
	}
}


