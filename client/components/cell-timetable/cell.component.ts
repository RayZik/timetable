import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AdminService } from '../../modules/admin/admin.service';
import { ApiService } from '../../service/api.service';
import { Router } from "@angular/router";
@Component({
	selector: 'tt-cell',
	templateUrl: "client/components/cell-timetable/cell.component.html",
	providers: [AdminService, ApiService],
	styleUrls: ['client/components/cell-timetable/cell.component.css']
})

export class CellComponent implements OnInit {
	@Input() cell;
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

	constructor(private adminService: AdminService, private apiService: ApiService, private router: Router) { }

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

	deleteCell(id: String): void {
		this.adminService
			.deleteCell(id)
			.subscribe();
	}

	clicked(id) {
		this.onChangedSaveCell.emit(true);
		this.router.navigate(['/admin/save-cell/', id]);
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