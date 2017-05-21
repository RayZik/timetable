import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class MainService {
    private cache: Object = {};

    constructor(private http: Http) { }

    private head() {
        let headers = new Headers({ 'Content-Type': 'application/json' })
        return new RequestOptions({ headers: headers });
    }

    getCellTimetable() {
        let headers = new Headers({ 'Content-Type': 'application/json' })
        if (this.cache['cells']) {
            return Observable.of(this.cache['cells']);
        } else {
            return this
                .http
                .get('/api/main/cellTimetable', headers)
                .map((response: Response) => {
                    this.cache['cells'] = response.json();
                    return this.cache['cells'];
                })
                .share()
        }
    }

    addTeacher(id: String, cellTimetableId: String) {
        return this
            .http
            .post('/api/main/cellTimetable/add_teacher', { id: id, cellTimetableId: cellTimetableId }, this.head())
    }

    deleteTeacher(id: String, cellTimetableId: String) {
        return this
            .http
            .post(`/api/main/cellTimetable/delete_teacher/${id}`, { cellTimetableId: cellTimetableId }, this.head())
    }

    addOffice(id: String, cellTimetableId: String) {
        return this
            .http
            .post('/api/main/cellTimetable/add_office', { id: id, cellTimetableId: cellTimetableId }, this.head())
    }

    deleteOffice(id: String, cellTimetableId: String) {
        return this
            .http
            .post(`/api/main/cellTimetable/delete_office/${id}`, { cellTimetableId: cellTimetableId }, this.head())
    }

    addGroup(id: String, cellTimetableId: String) {
        return this
            .http
            .post('/api/main/cellTimetable/add_group', { id: id, cellTimetableId: cellTimetableId }, this.head())
    }

    deleteGroup(id: String, cellTimetableId: String) {
        return this
            .http
            .post(`/api/main/cellTimetable/delete_group/${id}`, { cellTimetableId: cellTimetableId }, this.head())
    }

    addSubject(id: String, cellTimetableId: String) {
        return this
            .http
            .post('/api/main/cellTimetable/add_subject', { id: id, cellTimetableId: cellTimetableId }, this.head())
    }

    deleteSubject(id: String, cellTimetableId: String) {
        return this
            .http
            .post(`/api/main/cellTimetable/delete_subject/${id}`, { cellTimetableId: cellTimetableId }, this.head())
    }

    addCell(param) {
        return this
            .http
            .post('/api/main/cellTimetable/add_cell', param, this.head())
    }

    deleteCell(id, obj) {
        return this
            .http
            .post(`/api/main/cellTimetable/delete_cell/${id}`, this.head())
    }

    addTimeLesson(lesson) {
        return this
            .http
            .post('/api/main/timetable/add_time_lesson', lesson, this.head())
    }

    addDate(newDate) {
        return this
            .http
            .post('/api/main/timetable/add_date', newDate, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return false;
            })
    }

    getTimeLesson() {
        if (this.cache['tLesson']) {
            return Observable.of(this.cache['tLesson']);
        } else {
            return this
                .http
                .get('/api/main/timetable', this.head())
                .map((response: Response) => {
                    this.cache['tLesson'] = response.json();
                    return this.cache['tLesson'];
                })
                .share()
        }
    }

    getTimeLessonById(id: string) {
        return this
            .http
            .get(`/api/main/timetable/${id}`, this.head())
            .map((response: Response) => {
                this.cache['tLessonBId'] = response.json();
                return this.cache['tLessonBId'];
            })
            .share()
    }

    saveCell(data) {
        return this
            .http
            .put('/api/main/cellTimetable/save_cell', data, this.head())
    }

    deleteLesson(lesson) {
        return this
            .http
            .post('/api/main/timetable/delete_time_lesson', { lesson: lesson }, this.head())
    }

    getHolidays() {
        if (this.cache['holidays']) {
            return Observable.of(this.cache['holidays']);
        } else {
            return this
                .http
                .get(`/api/main/timetable/holidays`, this.head())
                .map((response: Response) => {
                    this.cache['holidays'] = response.json();
                    return this.cache['holidays'];
                })
                .share()
        }
    }
}
