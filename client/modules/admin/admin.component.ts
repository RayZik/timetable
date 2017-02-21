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
	private validedTimeCell = [];
	private data: any;

	constructor(private adminService: AdminService, private apiService: ApiService, private dragulaService: DragulaService) {
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
				this.outTable(data[0], this.validedTimeCell);
			});
	}

	outTable(data, validate) {
		this.timeList = [];
		this.dateList = [];
		let countSlots = [];
		let diffDate: number = moment(data.endDate).diff(data.beginDate, 'days');

		for (let a = 0; a <= diffDate; a++) {
			countSlots.push([]);
		}
		for (let i = 0; i <= diffDate; i++) {
			let beginDay = moment(data.beginDate).day();
			this.dateList.push(moment(data.beginDate).day(beginDay + i).toDate());
		}

		for (let i = 0; i < data.lessons.length; i++) {
			data.lessons[i].slots = countSlots;
			for (let j = 0; j < data.lessons[i].slots.length; j++) {
				let begin = moment(this.dateList[j]).second(data.lessons[i].begin).valueOf();
				let end = moment(this.dateList[j]).second(data.lessons[i].end).valueOf();
				validate.forEach(cell => {
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

	onChanged(validate) {
		if (validate.date.begin != '' && validate.date.end != '') {
			this.data.beginDate = moment.utc(validate.date.begin).toDate();
			this.data.endDate = moment.utc(validate.date.end).toDate();
		}
		this.outTable(this.data, validate.cells);
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

		this.ngOnInit();
	}

	addDate(newDate): void {
		this.adminService
			.addDate(newDate)
			.subscribe();
	}

	saveCell(value, slot, dayIndex, timeListBegin, timeListEnd) {

		if (value === 'week') {
			this.saveOneWeek(slot, dayIndex, timeListBegin, timeListEnd);
		}

		if (value === 'everyWeek') {
			this.saveToEnd(slot, dayIndex, timeListBegin, timeListEnd);
		}

		if (value === 'cherezWeek') {

		}
	}

	saveOneWeek(slot, dayIndex, timeListBegin, timeListEnd): void {
		let res = [];
		for (let i = 0; i < slot.length; i++) {
			let begin = moment(this.dateList[dayIndex]).second(timeListBegin).toDate();
			let end = moment(this.dateList[dayIndex]).second(timeListEnd).toDate();

			if (this.contains(slot[i].time, begin) == -1) {
				slot[i].time = { begin: begin, end: end };
				res.push([slot[i]._id, slot[i].time]);
			}
		}
		if (res.length > 0) {
			this.adminService
				.saveOneWeek(res)
				.subscribe();
		}
	}

	saveToEnd(slot, dayIndex, timeListBegin, timeListEnd): void {
		let res = [];

		let firstDayWeek = moment(this.dateList[0]).utc();
		let endDate = moment(this.data.endDate).utc();
		let diff = Math.ceil(endDate.diff(firstDayWeek, 'days') / 7);

		for (let i = 0; i < slot.length; i++) {
			let begin = moment(this.dateList[dayIndex]).second(timeListBegin).utc();
			let end = moment(this.dateList[dayIndex]).second(timeListEnd).utc();

			for (let e = 0; e < diff; e++) {
				if (this.contains(slot[i].time, begin.add(e * 7, 'day').toDate()) == -1) {
					slot[i].time.push({ begin: begin.add(e * 7, 'day').toDate(), end: end.add(e * 7, 'day').toDate() });
					begin = moment(this.dateList[dayIndex]).second(timeListBegin).utc();
					end = moment(this.dateList[dayIndex]).second(timeListEnd).utc();
				}
			}
			res.push([slot[i]._id, slot[i].time]);
		}
		console.log(res)

		// if (res.length > 0) {
		// 	this.adminService
		// 		.saveToEnd(res)
		// 		.subscribe();
		// }
	}

	contains(arr, elem) {
		if (arr.length > 0) {
			return arr.find((i) => i.begin === elem);
		} else {
			return -1;
		}
	}
}

