import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from './admin.service';
import { ApiService } from '../../service/api.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import moment from 'moment';

@Component({
	selector: 'tt-admin',
	templateUrl: 'client/modules/admin/admin.component.html',
	styleUrls: ['client/modules/admin/admin.component.css'],
	providers: [AdminService, ApiService],
	viewProviders: [DragulaService],
})

export class AdminComponent implements OnInit {

	private cellTimetable: any[] = [];
	private cellWithTime: any[] = [];
	private timeList: any[] = [];
	private holidayList: any[] = [];
	private lesson: any = {};
	private newDate: any = {};
	private dateList: any[] = [];
	private data: any;
	private dataForModalWindow = {};
	private showModal: Boolean = false;
	//cell
	private showSaveModal = false;
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
			});

		this.adminService
			.getCellTimetable()
			.flatMap(cells => {
				this.cellWithTime = [];
				this.cellTimetable = [];
				cells.forEach(cell => {
					if (cell.time.length > 0) {
						this.cellWithTime.push(cell);
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
					let date = moment(data[0].beginDate).day(beginDay + i);
					let cont = this.holidayList[0].date.find((elem) => date.isSame(moment(elem)));
					if (cont) {
						this.dateList.push({ day: date.toDate(), isHoliday: true });
					} else {
						this.dateList.push({ day: date.toDate(), isHoliday: false });
					}

				}
				this.outTable(data[0], this.cellWithTime);
			});
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

	onChanged(filter) {
		if (filter.dateList.length > 0) {
			this.dateList = filter.dateList;
		}
		this.outTable(this.data, filter.cells);
	}

	onChangedSaveCell(bool) {
		if (bool) {
			this.showSaveModal = true;
		}
	}

	dataCreateModal(cell, dayIndex, begin, end, createModal) {
		this.cellForSave = cell;
		this.dataForModalWindow = { dayIndex: dayIndex, begin: begin, end: end };
		if (this.showSaveModal) {
			createModal.show({ blurring: false, closable: false });
			this.showSaveModal = false;
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

	saveCell(value, dataForModal, createModal) {
		this.showSaveButton = true;
		if (value === 'week') {
			this.saveOneWeek(this.cellForSave, dataForModal.dayIndex, dataForModal.begin, dataForModal.end);
		}

		if (value === 'everyWeek') {
			this.saveToEnd(this.cellForSave, dataForModal.dayIndex, dataForModal.begin, dataForModal.end);
		}

		if (value === 'cherezWeek') {

		}
	}

	saveOneWeek(cell, dayIndex, timeListBegin, timeListEnd): void {
		let result = {};
		let begin = moment(this.dateList[dayIndex].day).second(timeListBegin);
		let end = moment(this.dateList[dayIndex].day).second(timeListEnd);

		if (this.contains(cell.time, begin.toISOString()) === undefined) {
			cell.time = { begin: begin.toDate(), end: end.toDate() };
			result = { id: cell._id, time: cell.time };
		}

		if (result != {}) {
			this.adminService
				.saveOneWeek(result)
				.subscribe();
		}
	}

	saveToEnd(cell, dayIndex, timeListBegin, timeListEnd): void {
		let result: Object = {};
		let arrTime = [];
		let firstDayWeek = moment(this.dateList[0].day).utc();
		let lastDate = moment(this.data.endDate).utc();
		let diff = Math.ceil(lastDate.diff(firstDayWeek, 'days') / 7);

		let begin = moment(this.dateList[dayIndex].day).second(timeListBegin);
		let end = moment(this.dateList[dayIndex].day).second(timeListEnd);

		for (let e = 0; e < diff; e++) {
			begin = moment(this.dateList[dayIndex].day).add(e * 7, 'day').second(timeListBegin);
			end = moment(this.dateList[dayIndex].day).add(e * 7, 'day').second(timeListEnd);

			if (this.contains(cell.time, begin.toISOString()) === undefined) {
				arrTime.push({ begin: begin.toDate(), end: end.toDate() });
			}
		}
		result = { id: cell._id, time: arrTime };
		if (arrTime.length > 0) {
			this.adminService
				.saveToEnd(result)
				.subscribe();
		}
	}

	contains(arr, elem) {
		if (arr.length > 0) {
			return arr.find((i) => i.begin === elem);
		}
		return undefined;
	}
}

