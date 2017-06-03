import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';

import { ApiService, MainService, ModalService } from '../../service/index';

@Component({
	selector: 'tt-cell',
	templateUrl: 'client/components/cell-timetable/cell.component.html',
	styleUrls: ['client/components/cell-timetable/cell.component.css']
})

export class CellComponent implements OnInit {
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

	constructor(
		private mainService: MainService,
		private apiService: ApiService,
		private router: Router,
		private modalService: ModalService
	) { }

	ngOnInit(): void {
		this.apiService
			.getTeachers()
			.subscribe(
			(data) => { this.teachers = data; });

		this.apiService
			.getGroups()
			.subscribe(
			(data) => { this.groups = data; });

		this.apiService
			.getOffices()
			.subscribe(
			(data) => { this.offices = data; });

		this.apiService
			.getSubjects()
			.subscribe(
			(data) => { this.subjects = data; });
	}

	editCell(): void {
		let obj: Object = {
			dayIndex: this.dayIndex,
			nameModal: 'cell-modal',
			cell: this.cell,
			time: this.time
		}

		this.clickSaveCell.emit(obj);
	}

	addTeacher(): void {
		let obj: Object = { id: this.idTeacher.id, cellId: this.idCell }
		this.mainService
			.addTeacher(obj)
			.subscribe(data => {
				if (data) {

				}
			});

		this.idTeacher.show = false;
	}

	deleteTeacher(id: string, idCell: string): void {
		let obj: Object = { id: id, cellId: idCell };

		this.mainService
			.deleteTeacher(obj)
			.subscribe();
	}

	addGroup(): void {
		let obj: Object = { id: this.idGroup.id, cellId: this.idCell };

		this.mainService
			.addGroup(obj)
			.subscribe();
		this.idGroup.show = false;
	}

	deleteGroup(id: String, idCell: String): void {
		let obj: Object = { id: id, cellId: idCell };

		this.mainService
			.deleteGroup(obj)
			.subscribe();
	}

	addOffice(): void {
		let obj: Object = { id: this.idOffice.id, cellId: this.idCell };

		this.mainService
			.addOffice(obj)
			.subscribe();
		this.idOffice.show = false;
	}

	deleteOffice(id: String, idCell: String): void {
		let obj: Object = { id: id, cellId: idCell };

		this.mainService
			.deleteOffice(obj)
			.subscribe();
	}

	addSubject(): void {
		let obj: Object = { id: this.idSubject.id, cellId: this.idCell };
		console.log(obj)
		this.mainService
			.addSubject(obj)
			.subscribe();
		this.idSubject.show = false;
	}

	deleteSubject(id: String, idCell: String): void {
		let obj: Object = { id: id, cellId: idCell };

		this.mainService
			.deleteSubject(obj)
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
}