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
	private dateList: any = [];
	private timeList: any = [];
	private lesson: any = {};
	private newDate: any = {};

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
	}

	private onRemoveModel(args) {
		let [el, source] = args;
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
				this.timeList = [];
				for (var i = 0; i < data[0].lessons.length; i++) {
					data[0].lessons[i].slots = [[], [], [], [], [], [], []];
					this.timeList.push(data[0].lessons[i]);
				}
			},
			(err) => console.log(err)
			);

		let d = new Date(0);
		for (let i = 0; i < 8; i++) {
			this.dateList.push(d.getDay() + i);
		}
		console.log(d);
	}

	addCell(): void {
		this.adminService
			.addCell()
			.subscribe();
		this.ngOnInit();
	}

	addLesson(lesson) {
		lesson.begin = this.getTimeForLessons(lesson.begin);
		lesson.end = this.getTimeForLessons(lesson.end);
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

	saveTimetable(data) {
		let res = { data: data };

		this.adminService
			.saveTimetable(res)
			.subscribe();
	}

	getTimeForLessons(time: String) {
		let date = new Date(0);
		let t = time.split(':');
		date.setHours(+t[0], +t[1], 0);
		return date.getTime();
	}
}



