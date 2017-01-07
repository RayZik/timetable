import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from './admin.service';
import { ApiService } from '../../service/api.service';

@Component({
	selector: 'tt-admin',
	templateUrl: "client/modules/admin/admin.component.html",
	providers: [AdminService, ApiService],
})

export class AdminComponent implements OnInit {
	private counter: number = 0;
	private timetable: any[] = [];
	private teachers: any[];
	private subjects: any[];
	private offices: any[];
	private groups: any[];
	private idTeacher: any = { id: "", show: false };
	private idSubject: any = { id: "", show: false };
	private idOffice: any = { id: "", show: false };
	private idGroup: any = { id: "", show: false };
	private idTimetable: String = "";

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
			.addTeacher(this.idTeacher.id, this.idTimetable)
			.subscribe();
		this.idTeacher.show = false;
		this.refresh();
	}

	deleteTeacher(id: String, idTimetable: String) {
		this.adminService
			.deleteTeacher(id, idTimetable)
			.subscribe();
		this.refresh();
	}

	addGroup(): void {
		this.adminService
			.addGroup(this.idGroup.id, this.idTimetable)
			.subscribe();
		this.idGroup.show = false;
		this.refresh();
	}

	deleteGroup(id: String, idTimetable: String) {
		this.adminService
			.deleteGroup(id, idTimetable)
			.subscribe();
		this.refresh();
	}

	addOffice(): void {
		this.adminService
			.addOffice(this.idOffice.id, this.idTimetable)
			.subscribe();
		this.idOffice.show = false;
		this.refresh();
	}

	deleteOffice(id: String, idTimetable: String) {
		this.adminService
			.deleteOffice(id, idTimetable)
			.subscribe();
		this.refresh();
	}

	addSubject(): void {
		this.adminService
			.addSubject(this.idSubject.id, this.idTimetable)
			.subscribe();
		this.idSubject.show = false;
		this.refresh();
	}

	deleteSubject(id: String, idTimetable: String) {
		this.adminService
			.deleteSubject(id, idTimetable)
			.subscribe();
		this.refresh();
	}

	showSelectGroup(id: String): void { this.idTimetable = id; this.idGroup.show = !this.idGroup.show; }
	showSelectOffice(id: String): void { this.idTimetable = id; this.idOffice.show = !this.idOffice.show; }
	showSelectSubject(id: String): void { this.idTimetable = id; this.idSubject.show = !this.idSubject.show; }
	showSelectTeacher(id: String): void { this.idTimetable = id; this.idTeacher.show = !this.idTeacher.show; }

	setTeacherId(id: String): void { this.idTeacher.id = id; }
	setGroupId(id: String): void { this.idGroup.id = id; }
	setSubjectId(id: String): void { this.idSubject.id = id; }
	setOfficeId(id: String): void { this.idOffice.id = id; }

	refresh(): void {
		this.adminService
			.getTimetable()
			.subscribe(
			(data) => { this.timetable = data; },
			(err) => console.log(err)
			);
	}
}