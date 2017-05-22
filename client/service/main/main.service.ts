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

    getCellTimetable(): Observable<any> {
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

    addTeacher(obj: Object): Observable<boolean> {
        return this
            .http
            .post('/api/main/cellTimetable/add_teacher', obj, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            })
    }

    deleteTeacher(obj: any): Observable<boolean> {
        return this
            .http
            .post(`/api/main/cellTimetable/delete_teacher/${obj.id}`, obj, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            })
    }

    addOffice(obj: Object): Observable<boolean> {
        return this
            .http
            .post('/api/main/cellTimetable/add_office', obj, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            })
    }

    deleteOffice(obj: any): Observable<boolean> {
        return this
            .http
            .post(`/api/main/cellTimetable/delete_office/${obj.id}`, obj, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            })
    }

    addGroup(obj: Object): Observable<boolean> {
        return this
            .http
            .post('/api/main/cellTimetable/add_group', obj, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            })
    }

    deleteGroup(obj: any): Observable<boolean> {
        return this
            .http
            .post(`/api/main/cellTimetable/delete_group/${obj.id}`, obj, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            })
    }

    addSubject(obj: Object): Observable<boolean> {
        return this
            .http
            .post('/api/main/cellTimetable/add_subject', obj, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            })
    }

    deleteSubject(obj: any): Observable<boolean> {
        return this
            .http
            .post(`/api/main/cellTimetable/delete_subject/${obj.id}`, obj, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            })
    }

    addCell(obj: Object): Observable<boolean> {
        return this
            .http
            .post('/api/main/cellTimetable/add_cell', obj, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            })
    }

    deleteCell(obj: any): Observable<boolean> {
        return this
            .http
            .post(`/api/main/cellTimetable/delete_cell/${obj.id}`, obj, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            })
    }

    addTimeLesson(obj: Object): Observable<boolean> {
        return this
            .http
            .post('/api/main/timetable/add_time_lesson', obj, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            })
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

    saveCell(data): Observable<boolean> {
        return this
            .http
            .put('/api/main/cellTimetable/save_cell', data, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            })
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
