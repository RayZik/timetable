import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminService {
    constructor(private http: Http) { }

    getTimetable() {
        return this
            .http
            .get('/api/admin')
            .map((response: Response) => response.json());
    }

    addTeacher(id: String, timetableLineId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post("/api/admin/add_teacher", { id: id, timetableLineId: timetableLineId }, { headers: headers })
    }

    deleteTeacher(id: String, idTimetable: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/admin/delete_teacher/${id}`, { idTimetable: idTimetable }, { headers: headers })
    }

    addOffice(id: String, timetableLineId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post("/api/admin/add_office", { id: id, timetableLineId: timetableLineId }, { headers: headers })
    }

    deleteOffice(id: String, idTimetable: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/admin/delete_office/${id}`, { idTimetable: idTimetable }, { headers: headers })
    }

    addGroup(id: String, timetableLineId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post("/api/admin/add_group", { id: id, timetableLineId: timetableLineId }, { headers: headers })
    }

    deleteGroup(id: String, idTimetable: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/admin/delete_group/${id}`, { idTimetable: idTimetable }, { headers: headers })
    }

    addSubject(id: String, timetableLineId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post("/api/admin/add_subject", { id: id, timetableLineId: timetableLineId }, { headers: headers })
    }

    deleteSubject(id: String, idTimetable: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/admin/delete_subject/${id}`, { idTimetable: idTimetable }, { headers: headers })
    }

}