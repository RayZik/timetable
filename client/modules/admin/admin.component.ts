import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from './admin.service';
import { ApiService } from '../../service/api.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import moment from 'moment';

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
	private validedTimeCell: any[] = [];
	private arrayWeeks: any[] = [];
	private data;

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

	ngOnInit() {
		this.adminService
			.getCellTimetable()
			.flatMap(cells => {
				this.validedTimeCell = [];
				this.cellTimetable = [];
				cells.forEach(cell => {
					if (cell.time.length > 0) {
						this.validedTimeCell.push(cell);
					} else {
						this.cellTimetable.push(cell);
					}
				});

				return this.adminService.getTimeLesson();
			})
			.subscribe((data) => {
				this.data = data[0];
				this.dateList = [];
				for (let i = 0; i < 7; i++) {
					let beginDay = moment(data[0].beginDate).day();
				    this.dateList.push(moment(data[0].beginDate).day(beginDay + i).toDate());
				}
				this.outTable(data[0]);

			});
	}

	outTable(data) {
		this.timeList = [];
		for (let i = 0; i < data.lessons.length; i++) {
			data.lessons[i].slots = [[], [], [], [], [], [], []];
			for (let j = 0; j < data.lessons[i].slots.length; j++) {
				let begin = moment(this.dateList[j]).second(data.lessons[i].begin).valueOf();
				let end = moment(this.dateList[j]).second(data.lessons[i].end).valueOf();
				this.validedTimeCell.forEach(cell => {
					cell.time.forEach(time => {
						if (moment(time.begin).valueOf() === moment(begin).valueOf()) {
							data.lessons[i].slots[j].push(cell);
						}
					});
				});
			}
			this.timeList.push(data.lessons[i]);
		}
	}


	addCell(): void {
		this.adminService
			.addCell()
			.subscribe();
	}

	addLesson(lesson): void {
		lesson.begin = this.toInt(lesson.begin);
		lesson.end = this.toInt(lesson.end);
		this.adminService
			.addTimeLesson(lesson)
			.subscribe();

	}

	toInt(time: String): Number {
		let arr = time.split(':');
		return +arr[1] + (+arr[0] * 60);
	}

	deleteTimeLesson(lessonRow): void {
		let resSend = [];
		for (let i = 0; i < lessonRow.slots.length; i++) {
			if (lessonRow.slots[i].length > 0) {
				lessonRow.slots[i].forEach(cell => {
					resSend.push(cell._id);
				});
			}
		}
		lessonRow = [lessonRow._id, resSend];

		this.adminService
			.deleteLesson(lessonRow)
			.subscribe();
	}

	addDate(newDate): void {
		this.adminService
			.addDate(newDate)
			.subscribe();
	}

	saveOneWeek(data): void {
		let res = [];
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[i].slots.length; j++) {
				for (let t = 0; t < data[i].slots[j].length; t++) {
					if (data[i].slots[j][t]) {
						let begin = moment(this.dateList[j]).second(data[i].begin).utc().toDate();
						let end = moment(this.dateList[j]).second(data[i].end).utc().toDate();
						data[i].slots[j][t].time = { begin: begin, end: end };
						res.push([data[i].slots[j][t]._id, data[i].slots[j][t].time]);
					}
				}
			}
		}

		this.adminService
			.saveOneWeek(res)
			.subscribe();
	}

	saveToEnd(data): void {
		let res = [];
		let firstDayWeek = moment(this.dateList[0]);
		let endDate = moment(this.data.endDate);
		let diff = Math.ceil(endDate.diff(firstDayWeek, 'days') / 7);

		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[i].slots.length; j++) {
				for (let t = 0; t < data[i].slots[j].length; t++) {
					if (data[i].slots[j][t]) {
						let begin = moment(this.dateList[j]).second(data[i].begin).utc();
						let end = moment(this.dateList[j]).second(data[i].end).utc();
						data[i].slots[j][t].time = [];
						for (let e = 0; e < diff; e++) {
							data[i].slots[j][t].time.push({ begin: begin.add(e * 7, 'day').toDate(), end: end.add(e * 7, 'day').toDate() });

							begin = moment(this.dateList[j]).second(data[i].begin).utc();
							end = moment(this.dateList[j]).second(data[i].end).utc();
						}
						res.push([data[i].slots[j][t]._id, data[i].slots[j][t].time]);
					}
				}
			}
		}
		this.adminService
			.saveToEnd(res)
			.subscribe();
	}

	prevWeek() {
		let n = this.dateList;

		this.dateList = [];
		for (let i = 7; i >= 1; i--) {
			this.dateList.push(moment(n[0]).add(-i, 'day').toDate());
		}

		this.outTable(this.data);
	}

	nextWeek() {
		let n = this.dateList;
		let len = n.length - 1;

		this.dateList = [];
		for (let i = 1; i <= 7; i++) {
			this.dateList.push(moment(n[len]).add(i, 'day').toDate());
		}
		this.outTable(this.data);
	}
}

