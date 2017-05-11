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

	constructor(
		private mainService: MainService,
		private apiService: ApiService,
		private router: Router,
		private modalService: ModalService
	) { }


	ngOnChanges(changes: SimpleChanges): void {

	}

	ngOnInit(): void {
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

	deleteCell(cell: any) {
		
	}
}