import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminService {
    private cache: Object = {};
    constructor(private http: Http) { }

    //cell-timetable
    getCellTimetable() {
        if (this.cache['cells']) {
            return Observable.of(this.cache['cells']);
        } else {
            return this
                .http
                .get('/api/admin/cellTimetable')
                .map((response: Response) => {
                    this.cache['cells'] = response.json();
                    return this.cache['cells'];
                })
                .share()
        }
    }

    addTeacher(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post("/api/admin/cellTimetable/add_teacher", { id: id, cellTimetableId: cellTimetableId }, { headers: headers })
    }

    deleteTeacher(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/admin/cellTimetable/delete_teacher/${id}`, { cellTimetableId: cellTimetableId }, { headers: headers })
    }

    addOffice(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post("/api/admin/cellTimetable/add_office", { id: id, cellTimetableId: cellTimetableId }, { headers: headers })
    }

    deleteOffice(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/admin/cellTimetable/delete_office/${id}`, { cellTimetableId: cellTimetableId }, { headers: headers })
    }

    addGroup(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post("/api/admin/cellTimetable/add_group", { id: id, cellTimetableId: cellTimetableId }, { headers: headers })
    }

    deleteGroup(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/admin/cellTimetable/delete_group/${id}`, { cellTimetableId: cellTimetableId }, { headers: headers })
    }

    addSubject(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post("/api/admin/cellTimetable/add_subject", { id: id, cellTimetableId: cellTimetableId }, { headers: headers })
    }

    deleteSubject(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/admin/cellTimetable/delete_subject/${id}`, { cellTimetableId: cellTimetableId }, { headers: headers })
    }

    addCell() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post("/api/admin/cellTimetable/add_cell", { headers: headers })
    }

    deleteCell(id: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .delete(`/api/admin/cellTimetable/delete_cell/${id}`, { headers: headers })
    }

    //timetable
    addTimeLesson(lesson) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post("/api/admin/timetable/add_time_lesson", lesson, { headers: headers })
    }

    addDate(newDate) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post("/api/admin/timetable/add_date", newDate, { headers: headers })
    }

    getTimeLesson() {
        if (this.cache['tLesson']) {
            return Observable.of(this.cache['tLesson']);
        } else {
            return this
                .http
                .get('/api/admin/timetable')
                .map((response: Response) => {
                    this.cache['tLesson'] = response.json();
                    return this.cache['tLesson'];
                })
                .share()
        }
    }

    saveCell(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .put("/api/admin/timetable/save_cell", data, { headers: headers })
    }

    deleteLesson(lesson) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post("/api/admin/timetable/delete_time_lesson", { lesson: lesson }, { headers: headers })
    }

    getHolidays() {
        if (this.cache['holidays']) {
            return Observable.of(this.cache['holidays']);
        } else {
            return this
                .http
                .get('/api/admin/timetable/holidays')
                .map((response: Response) => {
                    this.cache['holidays'] = response.json();
                    return this.cache['holidays'];
                })
                .share()
        }
    }
}