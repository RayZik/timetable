import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import moment from 'moment';

import { ApiService, MainService, ModalService } from '../../../service/index';

@Component({
	selector: 'tt-main-item',
	templateUrl: 'client/modules/main/item/main-item.component.html',
	styleUrls: ['client/modules/main/item/main-item.component.css'],
	viewProviders: [DragulaService]
})

export class MainItemComponent implements OnInit {

	private cellTimetable: any[] = [];
	private cellWithTime: any[] = [];
	private timeList: any[] = [];
	private holidayList: any[] = []; 
	private lesson: Object = {};
	private dateList: any[] = [];
	private data: any = [];
	private dataForModalWindow: Object = {};
	private showModal: Boolean = false;
	private param: Object = {};
	private daysName: any[] = ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вс.'];
	private arrRepWithInter: any[] = [];
	private showSaveButton: Boolean = true;
	private cellForSave: any;
	private collapse: Boolean = true;
	private configSave: Object = {};
	private inputConfig: Object = {}
	private queryParam: Object = {};
	private paramQuery: Object = {};

	constructor(
		private mainService: MainService,
		private apiService: ApiService,
		private dragulaService: DragulaService,
		private modalService: ModalService,
		private activatedRoute: ActivatedRoute,
		private location: Location
	) {
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

		for (let i = 2; i <= 30; i++) {
			this.arrRepWithInter.push(i);
		}

		this.mainService
			.getHolidays() 
			.subscribe((data) => {
				this.holidayList = data;
			});

		this.mainService
			.getCellTimetable()
			.flatMap(cells => {
				this.param = this.activatedRoute.snapshot.params;
				this.queryParam = this.activatedRoute.snapshot.queryParams
				this.cellWithTime = [];
				this.cellTimetable = [];
				cells.forEach(cell => {
					if (cell.time.length > 0 && cell.timetableId === this.param['id']) {
						this.cellWithTime.push(cell);
					}

					if (cell.time.length === 0 && cell.timetableId === this.param['id']) {
						this.cellTimetable.push(cell);
					}
				});
				return this.mainService.getTimeLessonById(this.param['id']);
			})
			.subscribe((data) => {
				this.data = data;
				let bDay = moment(data.beginDate);
				this.dateList = [];

				if (bDay.day() === 0) {
					this.data.beginDate = bDay.add(-6, 'day');
				}

				if (bDay.day() !== 1 && bDay.day() !== 0) {
					let diff = 1 - bDay.day();
					this.data.beginDate = bDay.add(diff, 'day');
				}

				for (let i = 0; i < 7; i++) {
					let beginDay = moment(this.data.beginDate).day();
					let date = moment(this.data.beginDate).day(beginDay + i);
					let cont = this.holidayList[0].date.find((elem) => date.isSame(moment(elem)));
					if (cont) {
						this.dateList.push({ day: date.toISOString(), isHoliday: true });
					} else {
						this.dateList.push({ day: date.toISOString(), isHoliday: false });
					}

				}
				this.outTable(this.data, this.cellWithTime);
			});

		this.dragCellBox();
	}

	outTable(data: any, validate: any[]): void {
		this.timeList = [];
		for (let i = 0; i < data.lessons.length; i++) {
			let countSlots = [];
			for (let a = 0; a < 7; a++) {
				countSlots.push([]);
			}

			data.lessons[i].slots = countSlots;
			for (let j = 0; j < data.lessons[i].slots.length; j++) {
				let begin = moment(this.dateList[j].day).second(data.lessons[i].begin).unix();
				let end = moment(this.dateList[j].day).second(data.lessons[i].end).unix();
				validate.forEach(cell => {
					cell.time.forEach(time => {
						if (moment(time.begin).unix() === begin && moment(time.end).unix() === end) {
							data.lessons[i].slots[j].push(cell);
						}
					});
				});
			}
			this.timeList.push(data.lessons[i]);
		}
	}

	onChanged(filter: any): void {
		if (filter.dateList.length > 0) {
			this.dateList = filter.dateList;
		}

		this.outTable(this.data, filter.cells);
		// if (filter.data) {
		// 	this.outTable(this.data, filter.cells);
		// } else {
		// 	this.outTable(this.data, filter.cells);
		// }

		this.paramQuery = {};
	}

	checkQueryParam(param: Object, query: Object): void {
		if (param) {
			let id = param['id'];

			if (query) {
				// this.paramQuery = { id: id, date: { begin: '04-02-2017' }, configFilter: { teacher: { checked: true, arr: [] }, group: { checked: true, arr: [] }, office: { checked: true, arr: [] }, sublect: { checked: true, arr: [] } } }

			} else {
				// this.paramQuery = { er: 'er' }
			}
		}
	}

	addCell(): void {
		let par = { id: this.param['id'] }
		this.mainService
			.addCell(par)
			.subscribe();
	}

	addLesson(lesson: any): void {
		lesson.begin = this.toInt(lesson.begin);
		lesson.end = this.toInt(lesson.end);
		lesson.timetableId = this.param['id'];

		this.mainService
			.addTimeLesson(lesson)
			.subscribe();
	}

	toInt(time: String): Number {
		let arr = time.split(':');
		return +arr[1] + (+arr[0] * 60);
	}

	deleteTimeLesson(lessonRow: any): void {
		let resSend = [];

		for (let i = 0; i < lessonRow.slots.length; i++) {
			if (lessonRow.slots[i].length > 0) {
				lessonRow.slots[i].forEach(cell => {
					resSend.push(cell._id);
				});
			}
		}
		lessonRow = [lessonRow._id, resSend];

		this.mainService
			.deleteLesson(lessonRow)
			.subscribe();
	}

	dragCellBox(): void {
		let box = document.getElementById('myBoxCell');
		let takeBox = document.getElementById('takeBox');

		takeBox.onmousedown = function (e) {
			box.style.position = 'absolute';

			function moveAt(e) {
				box.style.left = e.pageX - takeBox.offsetWidth / 2 + 'px';
				box.style.top = e.pageY - takeBox.offsetHeight / 2 + 'px';
			}

			document.onmousemove = function (e) {
				moveAt(e);
			}

			takeBox.onmouseup = function () {
				document.onmousemove = null;
				takeBox.onmouseup = null;
			}

			takeBox.ondragstart = function () {
				return false;
			};
		}

	}

	openModal(id: string): void {
		this.modalService.open(id);
	}

	closeModal(id: string): void {
		this.modalService.close(id);
	}

	clickSaveCell(obj: any): void {
		this.inputConfig = obj;
		this.setDefaultConfig();
		this.configSave['id'] = obj.cell._id;
		this.openModal(obj.nameModal);
	}

	setDefaultConfig(): void {
		this.configSave = {};
		this.configSave['repeat'] = 'day';
		this.configSave['repeatWithInterval'] = '1';
		this.configSave['beginDate'] = moment(this.dateList[this.inputConfig['dayIndex']].day).format('YYYY-MM-DD').toString();
		this.configSave['endDate'] = moment(this.data.endDate).format('YYYY-MM-DD').toString();
		this.configSave['begin'] = moment(this.dateList[this.inputConfig['dayIndex']].day).format();
		this.configSave['selectedDay'] = [];
	}

	settings(repeatWith: any): void {
		this.setDefaultConfig();
		this.configSave['repeat'] = repeatWith;
	}

	selectDays(day: any, idx: string): void {
		if (day.checked) {
			this.configSave['selectedDay'].push(idx);
		} else {
			let indElem = this.configSave['selectedDay'].indexOf(idx);
			if (indElem !== -1) {
				this.configSave['selectedDay'].splice(indElem, 1);
			}
		}
	}

	saveCell(config: any): void {
		let arrTime = { id: this.inputConfig['cell']._id, time: [] };
		let interval: number = config.repeatWithInterval;

		if (config.repeat !== 'day') {
			let firstDayWeek = moment(this.dateList[this.inputConfig['dayIndex']].day).utc();
			let lastDate = moment(config.endDate).utc();
			let diff = Math.ceil(lastDate.diff(firstDayWeek, config.repeat) / interval);

			for (let e = 0; e <= diff; e++) {

				if (config.selectedDay.length > 0) {
					let sDay = config.selectedDay;
					for (let i = 0; i < sDay.length; i++) {
						let begin = moment(this.dateList[sDay[i]].day).add(e * interval, config.repeat).second(this.inputConfig['time'].begin);
						let end = moment(this.dateList[sDay[i]].day).add(e * interval, config.repeat).second(this.inputConfig['time'].end);

						if (this.contains(this.inputConfig['cell'].time, begin.toISOString(), end.toISOString()) === -1) {
							arrTime.time.push({ begin: begin.toDate(), end: end.toDate(), timetableId: this.param['id'] });
						}
					}
				} else {
					let begin = moment(config.begin).add(e * interval, config.repeat).second(this.inputConfig['time'].begin);
					let end = moment(config.begin).add(e * interval, config.repeat).second(this.inputConfig['time'].end);

					if (this.contains(this.inputConfig['cell'].time, begin.toISOString(), end.toISOString()) === -1) {
						arrTime.time.push({ begin: begin.toDate(), end: end.toDate(), timetableId: this.param['id'] });
					}
				}

			}
		}

		if (config.repeat === 'day' && config.selectedDay.length > 0) {
			let sDay = config.selectedDay;

			for (let i = 0; i < sDay.length; i++) {
				let begin = moment(this.dateList[sDay[i]].day).second(this.inputConfig['time'].begin);
				let end = moment(this.dateList[sDay[i]].day).second(this.inputConfig['time'].end);

				if (this.contains(this.inputConfig['cell'].time, begin.toISOString(), end.toISOString()) === -1) {
					arrTime.time.push({ begin: begin.toDate(), end: end.toDate(), timetableId: this.param['id'] });
				}
			}
		}
		if (arrTime.time.length > 0) {
			this.mainService
				.saveCell(arrTime)
				.subscribe();
		}
	}

	deleteCell(): void {
		let id: string = this.inputConfig['cell']._id;
		let obj: Object = { id: id, time: [] };

		this.mainService
			.deleteCell(obj)
			.subscribe();
	}

	deleteCellWithMoment(): void {
		let beginDate: string = moment(this.dateList[this.inputConfig['dayIndex']].day).second(this.inputConfig['time'].begin).toISOString();
		let id: string = this.inputConfig['cell']._id;
		let res: any[] = [];

		this.inputConfig['cell'].time.find((el, idx) => {
			if (!moment(el.begin).isSameOrAfter(beginDate)) {
				res.push(el);
			}
		});
		let obj: Object = { id: id, time: res };

		this.mainService
			.deleteCell(obj)
			.subscribe();
	}

	deleteThisCell(): void {
		let beginDate: string = moment(this.dateList[this.inputConfig['dayIndex']].day).second(this.inputConfig['time'].begin).toISOString();
		let id: string = this.inputConfig['cell']._id;
		let res: any[] = [];

		this.inputConfig['cell'].time.find((el, idx) => {
			if (el.begin !== beginDate) {
				res.push(el);
			}
		});

		let obj: Object = { id: id, time: res };

		this.mainService
			.deleteCell(obj)
			.subscribe();
	}

	goBack(): void {
		this.location.back();
	}

	contains(arr: any, begin: string, end: string): number {
		let result = arr.find((i) => i.begin === begin && i.end === end);

		if (arr.length > 0) {
			if (result != undefined) {
				return result;
			} else {
				return -1
			}
		}
		return -1;
	}
}

