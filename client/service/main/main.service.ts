import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class MainService {
    private cache: Object = {};
    
    constructor(private http: Http) { }

    getCellTimetable() {
        if (this.cache['cells']) {
            return Observable.of(this.cache['cells']);
        } else {
            return this
                .http
                .get('/api/main/cellTimetable')
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
            .post('/api/main/cellTimetable/add_teacher', { id: id, cellTimetableId: cellTimetableId }, { headers: headers })
    }

    deleteTeacher(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/main/cellTimetable/delete_teacher/${id}`, { cellTimetableId: cellTimetableId }, { headers: headers })
    }

    addOffice(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post('/api/main/cellTimetable/add_office', { id: id, cellTimetableId: cellTimetableId }, { headers: headers })
    }

    deleteOffice(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/main/cellTimetable/delete_office/${id}`, { cellTimetableId: cellTimetableId }, { headers: headers })
    }

    addGroup(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post('/api/main/cellTimetable/add_group', { id: id, cellTimetableId: cellTimetableId }, { headers: headers })
    }

    deleteGroup(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/main/cellTimetable/delete_group/${id}`, { cellTimetableId: cellTimetableId }, { headers: headers })
    }

    addSubject(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post('/api/main/cellTimetable/add_subject', { id: id, cellTimetableId: cellTimetableId }, { headers: headers })
    }

    deleteSubject(id: String, cellTimetableId: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/main/cellTimetable/delete_subject/${id}`, { cellTimetableId: cellTimetableId }, { headers: headers })
    }

    addCell() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post('/api/main/cellTimetable/add_cell', { headers: headers })
    }

    deleteCell(id, obj) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/main/cellTimetable/delete_cell/${id}`, obj, { headers: headers })
    }

    addTimeLesson(lesson) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post('/api/main/timetable/add_time_lesson', lesson, { headers: headers })
    }

    addDate(newDate) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post('/api/main/timetable/add_date', newDate, { headers: headers })
    }

    getTimeLesson() {
        if (this.cache['tLesson']) {
            return Observable.of(this.cache['tLesson']);
        } else {
            return this
                .http
                .get('/api/main/timetable')
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
            .put('/api/main/cellTimetable/save_cell', data, { headers: headers })
    }

    deleteLesson(lesson) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post('/api/main/timetable/delete_time_lesson', { lesson: lesson }, { headers: headers })
    }

    getHolidays() {
        if (this.cache['holidays']) {
            return Observable.of(this.cache['holidays']);
        } else {
            return this
                .http
                .get('/api/main/timetable/holidays')
                .map((response: Response) => {
                    this.cache['holidays'] = response.json();
                    return this.cache['holidays'];
                })
                .share()
        }
    }
}
