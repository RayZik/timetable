import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../../modules/admin/admin.service';
import { ApiService } from '../../service/api.service';

@Component({
	selector: 'tt-cell',
	templateUrl: "client/components/cell-timetable/cell.component.html",
	providers: [AdminService, ApiService],
})

export class CellComponent implements OnInit {
	private cellTimetable: any[] = [];
	private teachers: any[];
	private subjects: any[];
	private offices: any[];
	private groups: any[];
	private idTeacher: any = { id: "", show: false };
	private idSubject: any = { id: "", show: false };
	private idOffice: any = { id: "", show: false };
	private idGroup: any = { id: "", show: false };
	private idCell: String = "";

	constructor(private adminService: AdminService, private apiService: ApiService) { }

	ngOnInit(): void {
		this.refresh();
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
		this.refresh();
	}

	deleteTeacher(id: String, idCell: String) {
		this.adminService
			.deleteTeacher(id, idCell)
			.subscribe();
		this.refresh();
	}

	addGroup(): void {
		this.adminService
			.addGroup(this.idGroup.id, this.idCell)
			.subscribe();
		this.idGroup.show = false;
		this.refresh();
	}

	deleteGroup(id: String, idCell: String) {
		this.adminService
			.deleteGroup(id, idCell)
			.subscribe();
		this.refresh();
	}

	addOffice(): void {
		this.adminService
			.addOffice(this.idOffice.id, this.idCell)
			.subscribe();
		this.idOffice.show = false;
		this.refresh();
	}

	deleteOffice(id: String, idCell: String) {
		this.adminService
			.deleteOffice(id, idCell)
			.subscribe();
		this.refresh();
	}

	addSubject(): void {
		this.adminService
			.addSubject(this.idSubject.id, this.idCell)
			.subscribe();
		this.idSubject.show = false;
		this.refresh();
	}

	deleteSubject(id: String, idCell: String) {
		this.adminService
			.deleteSubject(id, idCell)
			.subscribe();
		this.refresh();
	}



	deleteCell(id: String): void {
		this.adminService
			.deleteCell(id)
			.subscribe();
		this.refresh();
	}

	showSelectGroup(id: String): void { this.idCell = id; this.idGroup.show = !this.idGroup.show; }
	showSelectOffice(id: String): void { this.idCell = id; this.idOffice.show = !this.idOffice.show; }
	showSelectSubject(id: String): void { this.idCell = id; this.idSubject.show = !this.idSubject.show; }
	showSelectTeacher(id: String): void { this.idCell = id; this.idTeacher.show = !this.idTeacher.show; }

	setTeacherId(id: String): void { this.idTeacher.id = id; }
	setGroupId(id: String): void { this.idGroup.id = id; }
	setSubjectId(id: String): void { this.idSubject.id = id; }
	setOfficeId(id: String): void { this.idOffice.id = id; }

	refresh(): void {
		this.adminService
			.getCellTimetable()
			.subscribe(
			(data) => { this.cellTimetable = data; },
			(err) => console.log(err)
			);
	}
}