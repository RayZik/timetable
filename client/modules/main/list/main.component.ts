import { Component, OnInit, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import moment from 'moment';

import { ApiService, MainService, ModalService } from '../../service/index';

@Component({
	selector: 'tt-main',
	templateUrl: 'client/modules/main/main.component.html',
	styleUrls: ['client/modules/main/main.component.css'],
	viewProviders: [DragulaService]
})

export class MainComponentList implements OnInit {

	private cellTimetable: any[] = [];
	private cellWithTime: any[] = [];
	private timeList: any[] = [];
	private holidayList: any[] = [];
	private lesson: Object = {};
	private newDate: Object = {};
	private dateList: any[] = [];
	private data: any = [];
	private dataForModalWindow: Object = {};
	private showModal: Boolean = false;

	private daysName: any[] = ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вс.'];
	private arrRepWithInter: any[] = [];
	private showSaveButton = true;
	private cellForSave;
	private collapse: Boolean = true;
	private configSave: Object = {};
	private inputConfig: Object = {}

	constructor(
		private adminService: MainService,
		private apiService: ApiService,
		private dragulaService: DragulaService,
		private modalService: ModalService
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
				let bDay = moment(data[0].beginDate);
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


	outTable(data, validate) {
		this.timeList = [];

		for (let i = 0; i < data.lessons.length; i++) {
			let countSlots = [];
			for (let a = 0; a < 7; a++) {
				countSlots.push([]);
			}

			data.lessons[i].slots = countSlots;
			for (let j = 0; j < data.lessons[i].slots.length; j++) {
				let begin = moment(this.dateList[j].day).second(data.lessons[i].begin).unix();
				validate.forEach(cell => {
					cell.time.forEach(time => {
						if (moment(time.begin).unix() === begin) {
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

	/////////////////////////////////////////////
	dragCellBox() {
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

	openModal(id: string) {
		this.modalService.open(id);
	}

	closeModal(id: string) {
		this.modalService.close(id);
	}

	clickSaveCell(obj) {
		this.inputConfig = obj;
		this.setDefaultConfig();
		this.configSave['id'] = obj.cell._id;
		this.openModal(obj.nameModal);
	}

	setDefaultConfig() {
		this.configSave = {};
		this.configSave['repeat'] = 'day';
		this.configSave['repeatWithInterval'] = '1';
		this.configSave['beginDate'] = moment(this.dateList[this.inputConfig['dayIndex']].day).format('YYYY-MM-DD').toString();
		this.configSave['endDate'] = moment(this.data.endDate).format('YYYY-MM-DD').toString();
		this.configSave['begin'] = moment(this.dateList[this.inputConfig['dayIndex']].day).format();
		this.configSave['selectedDay'] = [];
	}

	settings(repeatWith) {
		this.setDefaultConfig();
		this.configSave['repeat'] = repeatWith;
	}

	selectDays(day, idx) {
		if (day.checked) {
			this.configSave['selectedDay'].push(idx);
		} else {
			let indElem = this.configSave['selectedDay'].indexOf(idx);
			if (indElem !== -1) {
				this.configSave['selectedDay'].splice(indElem, 1);
			}
		}
	}

	saveCell(config) {
		let arrTime = { id: this.inputConfig['cell']._id, time: [] };
		let interval = config.repeatWithInterval;

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

						if (this.contains(this.inputConfig['cell'].time, begin.toISOString()) === undefined) {
							arrTime.time.push({ begin: begin.toDate(), end: end.toDate() });
						}
					}
				} else {
					let begin = moment(config.begin).add(e * interval, config.repeat).second(this.inputConfig['time'].begin);
					let end = moment(config.begin).add(e * interval, config.repeat).second(this.inputConfig['time'].end);
					if (this.contains(this.inputConfig['cell'].time, begin.toISOString()) === undefined && end.isBetween(config.beginDate, config.endDate)) {
						arrTime.time.push({ begin: begin.toDate(), end: end.toDate() });
					}
				}

			}
		}

		if (config.repeat === 'day' && config.selectedDay.length > 0) {
			let sDay = config.selectedDay;

			for (let i = 0; i < sDay.length; i++) {
				let begin = moment(this.dateList[sDay[i]].day).second(this.inputConfig['time'].begin);
				let end = moment(this.dateList[sDay[i]].day).second(this.inputConfig['time'].end);

				if (this.contains(this.inputConfig['cell'].time, begin.toISOString()) === undefined) {
					arrTime.time.push({ begin: begin.toDate(), end: end.toDate() });
				}
			}
		}
		console.log('save1')
		if (arrTime.time.length > 0) {
			console.log('sav2e')
			// this.mainService
			// 	.saveCell(arrTime)
			// 	.subscribe();
		}
	}

	deleteCell(): void {
		let id = this.inputConfig['cell']._id;
		let obj = { time: [] };
		console.log('deleteCell')
		// this.mainService
		// 	.deleteCell(id, obj)
		// 	.subscribe();
	}

	deleteCellWithMoment(): void {
		let beginDate = moment(this.dateList[this.inputConfig['dayIndex']].day).second(this.inputConfig['time'].begin).toISOString();
		let id = this.inputConfig['cell']._id;
		let res = [];
		this.inputConfig['cell'].time.find((el, idx) => {
			if (!moment(el.begin).isSameOrAfter(beginDate)) {
				res.push(el);
			}
		});
		let obj = { time: res };
		console.log('WithMomen')
		// this.mainService
		// 	.deleteCell(id, obj)
		// 	.subscribe();
	}

	deleteThisCell(): void {
		let beginDate = moment(this.dateList[this.inputConfig['dayIndex']].day).second(this.inputConfig['time'].begin).toISOString();
		let id = this.inputConfig['cell']._id;
		let res = [];
		this.inputConfig['cell'].time.find((el, idx) => {
			if (el.begin !== beginDate) {
				res.push(el);
			}
		});
		let obj = { time: res };
		console.log('deleteThisCell')
		// this.mainService
		// 	.deleteCell(id, obj)
		// 	.subscribe();
	}

	contains(arr, elem) {
		if (arr.length > 0) {
			return arr.find((i) => i.begin === elem);
		}
		return undefined;
	}
}

