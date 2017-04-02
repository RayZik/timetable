import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AdminService } from '../../modules/admin/admin.service';
import { ApiService } from '../../service/api.service';
import { Router } from "@angular/router";
import moment from 'moment';
@Component({
	selector: 'tt-cell',
	templateUrl: "client/components/cell-timetable/cell.component.html",
	styleUrls: ['client/components/cell-timetable/cell.component.css']
})

export class CellComponent implements OnInit {
	@Input() cell;
	@Input() dateList;
	@Input() dayIndex;
	@Input() time;
	@Input() data;
	@Input() showSaveButton: Boolean;
	@Output() onChangedSaveCell = new EventEmitter<any>();
	private teachers: any[];
	private subjects: any[];
	private offices: any[];
	private groups: any[];
	private idTeacher: any = { id: "", show: false };
	private idSubject: any = { id: "", show: false };
	private idOffice: any = { id: "", show: false };
	private idGroup: any = { id: "", show: false };
	private idCell: String = "";
	private configSave: Object = {};
	private arrRepWithInter: any[] = [];
	private daysName: any[] = ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вс.'];

	constructor(private adminService: AdminService, private apiService: ApiService, private router: Router) { }

	ngOnInit(): void {

		for (let i = 2; i <= 30; i++) {
			this.arrRepWithInter.push(i);
		}

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

	addTeacher(): void {
		this.adminService
			.addTeacher(this.idTeacher.id, this.idCell)
			.subscribe();
		this.idTeacher.show = false;
	}

	deleteTeacher(id: String, idCell: String) {
		this.adminService
			.deleteTeacher(id, idCell)
			.subscribe();
	}

	addGroup(): void {
		this.adminService
			.addGroup(this.idGroup.id, this.idCell)
			.subscribe();
		this.idGroup.show = false;
	}

	deleteGroup(id: String, idCell: String) {
		this.adminService
			.deleteGroup(id, idCell)
			.subscribe();
	}

	addOffice(): void {
		this.adminService
			.addOffice(this.idOffice.id, this.idCell)
			.subscribe();
		this.idOffice.show = false;
	}

	deleteOffice(id: String, idCell: String) {
		this.adminService
			.deleteOffice(id, idCell)
			.subscribe();
	}

	addSubject(): void {
		this.adminService
			.addSubject(this.idSubject.id, this.idCell)
			.subscribe();
		this.idSubject.show = false;
	}

	deleteSubject(id: String, idCell: String) {
		this.adminService
			.deleteSubject(id, idCell)
			.subscribe();
	}

	deleteCell(id: String, repeatModal): void {
		this.adminService
			.deleteCell(id)
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

	setDefaultConfig() {
		this.configSave = {};
		this.configSave['repeat'] = 'day';
		this.configSave['repeatWithInterval'] = '1';
		this.configSave['beginDate'] = moment(this.dateList[this.dayIndex].day).format("YYYY-MM-DD").toString();
		this.configSave['endDate'] = moment(this.data.endDate).format("YYYY-MM-DD").toString();
	}

	clickSaveCell(repeatModal, cell) {
		this.setDefaultConfig();
		this.configSave['id'] = cell._id;
		repeatModal.show({ blurring: false, closable: false });
	}

	settings(repeatWith) {
		this.setDefaultConfig();
		this.configSave['repeat'] = repeatWith;
	}

	saveCell(config, cell) {
		let result = {};
		let arrTime = [];
		let begin: moment.Moment;
		let end: moment.Moment;
		let interval = config.repeatWithInterval;

		let firstDayWeek = moment(this.dateList[this.dayIndex].day).utc();
		let lastDate = moment(this.data.endDate).utc();
		let diff = Math.ceil(lastDate.diff(firstDayWeek, config.repeat) / interval);

		for (let e = 0; e <= diff; e++) {
			begin = moment(config.beginDate).add(e * interval, config.repeat).second(this.time.begin);
			end = moment(config.beginDate).add(e * interval, config.repeat).second(this.time.end);

			if (this.contains(cell.time, begin.toISOString()) === undefined && end.isBetween(config.beginDate, lastDate)) {
				arrTime.push({ begin: begin.toDate(), end: end.toDate() });
			}
		}
	}

	contains(arr, elem) {
		if (arr.length > 0) {
			return arr.find((i) => i.begin === elem);
		}
		return undefined;
	}

	save(res) {

		// 		this.adminService
		// 			.saveOneWeek(result)
		// 			.subscribe();
		// 	}
		console.log(res);
	}
}