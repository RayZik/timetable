import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from './admin.service';
import { ApiService } from '../../service/api.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import moment from 'moment';

@Component({
	selector: 'tt-admin',
	templateUrl: 'client/modules/admin/admin.component.html',
	styleUrls: ['client/modules/admin/admin.component.css'],
	viewProviders: [DragulaService]
})

export class AdminComponent implements OnInit {

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

	private showSaveButton = true;
	private cellForSave;
	private collapse: Boolean = true;

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

	onChangedSaveCell(bool) {
		if (bool) {

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

	contains(arr, elem) {
		if (arr.length > 0) {
			return arr.find((i) => i.begin === elem);
		}
		return undefined;
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

	collapseCellBox() {
		this.collapse = !this.collapse;
	}

}

