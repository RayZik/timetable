import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';

import { ApiService, MainService, ModalService } from '../../service/index';

@Component({
	selector: 'tt-cell',
	templateUrl: 'client/components/cell-timetable/cell.component.html',
	styleUrls: ['client/components/cell-timetable/cell.component.css']
})

export class CellComponent implements OnInit, OnChanges {


	@Input() cell;
	@Input() dateList;
	@Input() dayIndex;
	@Input() time;
	@Input() data;
	@Input() configSave: Object;
	@Input() showSaveButton: Boolean;
	@Output() clickSaveCell: EventEmitter<any> = new EventEmitter<any>();

	private teachers: any[];
	private subjects: any[];
	private offices: any[];
	private groups: any[];
	private idTeacher: any = { id: '', show: false };
	private idSubject: any = { id: '', show: false };
	private idOffice: any = { id: '', show: false };
	private idGroup: any = { id: '', show: false };
	private idCell: String = '';
	// private configSave: Object = {};
	// private arrRepWithInter: any[] = [];
	// private daysName: any[] = ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вс.'];

	constructor(
		private mainService: MainService,
		private apiService: ApiService,
		private router: Router,
		private modalService: ModalService
	) { }


	ngOnChanges(changes: SimpleChanges): void {

	}

	ngOnInit(): void {

		// for (let i = 2; i <= 30; i++) {
		// 	this.arrRepWithInter.push(i);
		// }

		this.apiService
			.getTeachers()
			.subscribe(
			(data) => { this.teachers = data; },
			(err) => console.log(err)
			);

		this.apiService
			.getGroups()
			.subscribe(
			(data) => { this.groups = data; },
			(err) => console.log(err)
			);

		this.apiService
			.getOffices()
			.subscribe(
			(data) => { this.offices = data; },
			(err) => console.log(err)
			);

		this.apiService
			.getSubjects()
			.subscribe(
			(data) => { this.subjects = data; },
			(err) => console.log(err)
			);


	}

	// change() {
	// 	console.log(this.configSave)
	// 	if (this.configSave['delete']) {
	// 		let inf = this.configSave['delete'];

	// 		if (inf === 'dAll') {
	// 			this.deleteCell();
	// 		}

	// 		if (inf === 'dToEnd') {
	// 			this.deleteCellWithMoment();
	// 		}

	// 		if (inf === 'dThis') {
	// 			this.deleteThisCell();
	// 		}
	// 	}

	// 	if (this.configSave['save']) {
	// 		this.saveCell(this.configSave);
	// 	}
	// }

	editCell() {
		let obj = {
			dayIndex: this.dayIndex,
			nameModal: 'cell-modal',
			cell: this.cell,
			time: this.time
		}

		this.clickSaveCell.emit(obj);
	}
	addTeacher(): void {
		this.mainService
			.addTeacher(this.idTeacher.id, this.idCell)
			.subscribe();
		this.idTeacher.show = false;
	}

	deleteTeacher(id: String, idCell: String) {
		this.mainService
			.deleteTeacher(id, idCell)
			.subscribe();
	}

	addGroup(): void {
		this.mainService
			.addGroup(this.idGroup.id, this.idCell)
			.subscribe();
		this.idGroup.show = false;
	}

	deleteGroup(id: String, idCell: String) {
		this.mainService
			.deleteGroup(id, idCell)
			.subscribe();
	}

	addOffice(): void {
		this.mainService
			.addOffice(this.idOffice.id, this.idCell)
			.subscribe();
		this.idOffice.show = false;
	}

	deleteOffice(id: String, idCell: String) {
		this.mainService
			.deleteOffice(id, idCell)
			.subscribe();
	}

	addSubject(): void {
		this.mainService
			.addSubject(this.idSubject.id, this.idCell)
			.subscribe();
		this.idSubject.show = false;
	}

	deleteSubject(id: String, idCell: String) {
		this.mainService
			.deleteSubject(id, idCell)
			.subscribe();
	}

	showSelectGroup(id: String): void { this.idCell = id; this.idGroup.show = !this.idGroup.show; }
	showSelectOffice(id: String): void { this.idCell = id; this.idOffice.show = !this.idOffice.show; }
	showSelectSubject(id: String): void { this.idCell = id; this.idSubject.show = !this.idSubject.show; }
	showSelectTeacher(id: String): void { this.idCell = id; this.idTeacher.show = !this.idTeacher.show; }

	setTeacherId(id: String): void { this.idTeacher.id = id; }
	setGroupId(id: String): void { this.idGroup.id = id; }
	setSubjectId(id: String): void { this.idSubject.id = id; }
	setOfficeId(id: String): void { this.idOffice.id = id; }

	// clickSaveCell(repeatModal, cell) {
	// 	this.setDefaultConfig();
	// 	this.configSave['id'] = cell._id;
	// 	repeatModal.show({ blurring: false, closable: false });
	// }

	// setDefaultConfig() {
	// 	this.configSave = {};
	// 	this.configSave['repeat'] = 'day';
	// 	this.configSave['repeatWithInterval'] = '1';
	// 	this.configSave['beginDate'] = moment(this.dateList[this.dayIndex].day).format('YYYY-MM-DD').toString();
	// 	this.configSave['endDate'] = moment(this.data.endDate).format('YYYY-MM-DD').toString();
	// 	this.configSave['begin'] = moment(this.dateList[this.dayIndex].day).format();
	// 	this.configSave['selectedDay'] = [];
	// }

	// settings(repeatWith) {
	// 	this.setDefaultConfig();
	// 	this.configSave['repeat'] = repeatWith;
	// }

	// selectDays(day, idx) {
	// 	if (day.checked) {
	// 		this.configSave['selectedDay'].push(idx);
	// 	} else {
	// 		let indElem = this.configSave['selectedDay'].indexOf(idx);
	// 		if (indElem !== -1) {
	// 			this.configSave['selectedDay'].splice(indElem, 1);
	// 		}
	// 	}
	// }

	// saveCell(config) {
	// 	let arrTime = { id: this.cell._id, time: [] };
	// 	let interval = config.repeatWithInterval;

	// 	if (config.repeat !== 'day') {
	// 		let firstDayWeek = moment(this.dateList[this.dayIndex].day).utc();
	// 		let lastDate = moment(config.endDate).utc();

	// 		let diff = Math.ceil(lastDate.diff(firstDayWeek, config.repeat) / interval);

	// 		for (let e = 0; e <= diff; e++) {

	// 			if (config.selectedDay.length > 0) {
	// 				let sDay = config.selectedDay;
	// 				for (let i = 0; i < sDay.length; i++) {
	// 					let begin = moment(this.dateList[sDay[i]].day).add(e * interval, config.repeat).second(this.time.begin);
	// 					let end = moment(this.dateList[sDay[i]].day).add(e * interval, config.repeat).second(this.time.end);

	// 					if (this.contains(this.cell.time, begin.toISOString()) === undefined) {
	// 						arrTime.time.push({ begin: begin.toDate(), end: end.toDate() });
	// 					}
	// 				}
	// 			} else {
	// 				let begin = moment(config.begin).add(e * interval, config.repeat).second(this.time.begin);
	// 				let end = moment(config.begin).add(e * interval, config.repeat).second(this.time.end);
	// 				if (this.contains(this.cell.time, begin.toISOString()) === undefined && end.isBetween(config.beginDate, config.endDate)) {
	// 					arrTime.time.push({ begin: begin.toDate(), end: end.toDate() });
	// 				}
	// 			}

	// 		}
	// 	}

	// 	if (config.repeat === 'day' && config.selectedDay.length > 0) {
	// 		let sDay = config.selectedDay;

	// 		for (let i = 0; i < sDay.length; i++) {
	// 			let begin = moment(this.dateList[sDay[i]].day).second(this.time.begin);
	// 			let end = moment(this.dateList[sDay[i]].day).second(this.time.end);

	// 			if (this.contains(this.cell.time, begin.toISOString()) === undefined) {
	// 				arrTime.time.push({ begin: begin.toDate(), end: end.toDate() });
	// 			}
	// 		}
	// 	}

	// 	if (arrTime.time.length > 0) {
	// 		console.log('save')
	// 		// this.mainService
	// 		// 	.saveCell(arrTime)
	// 		// 	.subscribe();
	// 	}
	// }

	// contains(arr, elem) {
	// 	if (arr.length > 0) {
	// 		return arr.find((i) => i.begin === elem);
	// 	}
	// 	return undefined;
	// }
}