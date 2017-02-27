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

	private cellTimetable: any[] = [];
	private validedTimeCell: any[] = [];
	private timeList: any[] = [];
	private holidayList: any[] = [];

	private lesson: any = {};
	private newDate: any = {};

	private dateList: any[] = [];

	private data: any;

	//cell
	private showSaveButton = true;
	private cellForSave;

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
			.getHolidays()
			.subscribe((data) => {
				this.holidayList = data;
			})

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
				this.addInDateList(data[0].beginDate);
				this.outTable(data[0], this.validedTimeCell);
			});
	}

	addInDateList(firstDay) {
		this.dateList = [];
		for (let i = 0; i < 7; i++) {
			let beginDay = moment(firstDay).day();
			let date = moment(firstDay).day(beginDay + i);
			let cont = this.holidayList[0].date.find((elem) => date.isSame(moment(elem)));
			if (cont) {
				this.dateList.push({ day: date.toDate(), isHoliday: true });
			} else {
				this.dateList.push({ day: date.toDate(), isHoliday: false });
			}

		}
	}

	outTable(data, validate) {
		this.timeList = [];

		for (let i = 0; i < data.lessons.length; i++) {
			let countSlots = [];
			for (let a = 0; a < 7; a++) {
				countSlots.push([]);
			}

			data.lessons[i].slots = countSlots;
			for (let j = 0; j < data.lessons[i].slots.length; j++) {
				let begin = moment(this.dateList[j].day).second(data.lessons[i].begin).valueOf();
				let end = moment(this.dateList[j].day).second(data.lessons[i].end).valueOf();
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
		if (validate.dateList.length > 0) {
			this.dateList = validate.dateList;
		}
		this.outTable(this.data, validate.cells);
	}

	onChangedSaveCell(bool) {
		if (bool) {
			this.showSaveButton = !this.showSaveButton;
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

	saveCell(value, dayIndex, timeListBegin, timeListEnd) {
		if (value === 'week') {
			this.saveOneWeek(this.cellForSave, dayIndex, timeListBegin, timeListEnd);
		}

		if (value === 'everyWeek') {
			this.saveToEnd(this.cellForSave, dayIndex, timeListBegin, timeListEnd);
		}

		if (value === 'cherezWeek') {

		}
	}

	saveOneWeek(slot, dayIndex, timeListBegin, timeListEnd): void {
		let result = {};

		let begin = moment(this.dateList[dayIndex].day).second(timeListBegin).toDate();
		let end = moment(this.dateList[dayIndex].day).second(timeListEnd).toDate();

		if (this.contains(slot.time, begin) == -1) {
			slot.time = { begin: begin, end: end };
			result = { id: slot._id, time: slot.time };
		}

		this.adminService
			.saveOneWeek(result)
			.subscribe();
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

