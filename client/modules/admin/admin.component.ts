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
	private topDate: Date;
	private validedTimeCell: any[] = [];

	constructor(private adminService: AdminService, private dragulaService: DragulaService) {
		dragulaService.dropModel.subscribe((value) => {
			this.onDropModel(value.slice(1));

		});

		dragulaService.removeModel.subscribe((value) => {
			this.onRemoveModel(value.slice(1));
		});

		this.adminService
			.getCellTimetable()
			.subscribe(
			(cells) => {
				cells.forEach(cell => {
					if (cell.time[0]) {
						this.validedTimeCell.push(cell);
					} else {
						this.cellTimetable.push(cell);
					}
				});
			},
			(err) => console.log(err)
			);

	}
	private onDropModel(args) {
		let [el, target, source] = args;

	}

	private onRemoveModel(args) {
		let [el, source] = args;
	}

	ngOnInit() {


		this.adminService
			.getTimeLesson()
			.subscribe(
			(data) => {


				this.timeList = [];
				this.topDate = new Date();
				if (this.dateList.length == 0) {
					for (let i = 0; i < 7; i++) {
						this.topDate = new Date(data[0].beginDate);
						this.topDate.setDate(this.topDate.getDate() + i);
						this.dateList.push(this.topDate);
					}
				}

				console.log(this.validedTimeCell)

				for (let i = 0; i < data[0].lessons.length; i++) {
					data[0].lessons[i].slots = [[], [], [], [], [], [], []];
					for (let j = 0; j < data[0].lessons[i].slots.length; j++) {
						let begin = this.dateList[j].getTime() + data[0].lessons[i].begin * 1000;
						let end = this.dateList[j].getTime() + data[0].lessons[i].end * 1000;

						this.validedTimeCell.forEach(cell => {
							// console.log(cell)
							cell.time.forEach(time => {
								// console.log(new Date(time.begin).getTime(), new Date(begin).getTime())
								if (new Date(time.begin).getTime() === new Date(begin).getTime()) {
									// console.log(cell)
									data[0].lessons[i].slots[j].push(cell);
									// console.log(data[0].lessons[i]);
								}
							});
						});
					}
					this.timeList.push(data[0].lessons[i]);
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

	addLesson(lesson): void {
		lesson.begin = this.toInt(lesson.begin);
		lesson.end = this.toInt(lesson.end);
		this.adminService
			.addTimeLesson(lesson)
			.subscribe();
		this.ngOnInit();
	}

	toInt(time: String): Number {
		let arr = time.split(':');
		return +arr[1] + (+arr[0] * 60);
	}

	deleteTimeLesson(lesson): void {
		this.adminService
			.deleteLesson(lesson)
			.subscribe();
		this.ngOnInit();
	}

	addDate(newDate): void {
		this.adminService
			.addDate(newDate)
			.subscribe();
	}

	saveTimetable(data): void {
		let res = [];
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[i].slots.length; j++) {
				for (let t = 0; t < data[i].slots[j].length; t++) {
					if (data[i].slots[j][t]) {
						let begin = (new Date(this.dateList[j]).getTime() + data[i].begin * 1000);
						let end = new Date(this.dateList[j]).getTime() + data[i].end * 1000;
						data[i].slots[j][t].time[0] = { begin: new Date(begin), end: new Date(end) };
						res.push([data[i].slots[j][t]._id, data[i].slots[j][t].time[0]]);
					}
				}
			}
		}
		this.adminService
			.saveTimetable(res)
			.subscribe();
		
	}

	cellWithTime(cellArray) {
		let res = [];
		for (let i = 0; i < cellArray.length; i++) {
			if (cellArray[i].time[0]) {
				res.push(cellArray[i])
			}
		}
		return res;
	}
}

