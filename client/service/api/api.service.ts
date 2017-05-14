import { Injectable } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';

@Injectable()
export class ApiService {
    private cache: Object = {};

    constructor(private http: Http) { }

    private head() {
        let currentUser = JSON.parse(localStorage.getItem('CurUser')) || null;
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', currentUser && currentUser.token);
        let headers = new Headers({ 'Content-Type': 'application/json' })

        return new RequestOptions({ headers: headers, search: params });
    }

    //subject
    getSubjects() {
        if (this.cache['subjects']) {
            return Observable.of(this.cache['subjects']);
        } else {
            return this
                .http
                .get('/api/main/subject', this.head())
                .map((response: Response) => {
                    this.cache['subjects'] = response.json();
                    return this.cache['subjects'];
                })
                .share()
        }
    }

    getSubject(id: any) {
        if (this.cache['subject']) {
            return Observable.of(this.cache['subject']);
        } else {
            return this
                .http
                .get(`/api/main/subject/${id}`, this.head())
                .map((response: Response) => {
                    this.cache['subject'] = response.json();
                    return this.cache['subject'];
                })
                .share()
        }
    }

    updateSubject(subject: any) {
        return this
            .http
            .put(`/api/main/subject/update/${subject.id}`, subject, this.head())
            .map((response: Response) => response);
    }

    createSubject(subject) {
        return this
            .http
            .post(`/api/main/subject/create`, subject, this.head())
            .map((response: Response) => response);
    }

    deleteSubject(id: any) {
        return this
            .http
            .delete(`/api/main/subject/remove/${id}`, this.head())
            .map((response: Response) => response);
    }

    //teacher

    getTeachers() {
        if (this.cache['teachers']) {
            return Observable.of(this.cache['teachers']);
        } else {
            return this
                .http
                .get('/api/main/teacher', this.head())
                .map((response: Response) => {
                    this.cache['teachers'] = response.json();
                    return this.cache['teachers'];
                })
                .share()
        }
    }

    getTeacher(id: any) {
        if (this.cache['teacher']) {
            return Observable.of(this.cache['teacher']);
        } else {
            return this
                .http
                .get(`/api/main/teacher/${id}`, this.head())
                .map((response: Response) => {
                    this.cache['teacher'] = response.json();
                    return this.cache['teacher'];
                })
                .share()
        }
    }

    updateTeacher(teacher: any) {
        return this
            .http
            .put(`/api/main/teacher/update/${teacher.id}`, teacher, this.head())
            .map((response: Response) => response);
    }

    createTeacher(teacher) {
        return this
            .http
            .post(`/api/main/teacher/create`, teacher, this.head())
            .map((response: Response) => response);
    }

    deleteTeacher(id: any) {
        return this
            .http
            .delete(`/api/main/teacher/remove/${id}`, this.head())
            .map((response: Response) => response);
    }

    //office
    getOffices() {
        if (this.cache['offices']) {
            return Observable.of(this.cache['offices']);
        } else {
            return this
                .http
                .get('/api/main/office')
                .map((response: Response) => {
                    this.cache['offices'] = response.json();
                    return this.cache['offices'];
                })
                .share()
        }
    }

    getOffice(id: any) {
        if (this.cache['office']) {
            return Observable.of(this.cache['office']);
        } else {
            return this
                .http
                .get(`/api/main/office/${id}`)
                .map((response: Response) => {
                    this.cache['office'] = response.json();
                    return this.cache['office'];
                })
                .share()
        }
    }

    updateOffice(office: any) {
        return this
            .http
            .put(`/api/main/office/update/${office.id}`, office, this.head())
            .map((response: Response) => response);
    }

    createOffice(office: any) {
        return this
            .http
            .post(`/api/main/office/create`, office, this.head())
            .map((response: Response) => response);
    }

    deleteOffice(id: any) {
        return this
            .http
            .delete(`/api/main/office/remove/${id}`, this.head())
            .map((response: Response) => response);
    }

    //group
    getGroups() {
        if (this.cache['groups']) {
            return Observable.of(this.cache['groups']);
        } else {
            return this
                .http
                .get('/api/main/group')
                .map((response: Response) => {
                    if (response.status === 200) {
                        this.cache['groups'] = response.json();
                        return this.cache['groups'];
                    }

                    return Observable.of({ status: response.status });
                })
                .share()
        }
    }

    getGroup(id: any) {
        if (this.cache['group']) {
            return Observable.of(this.cache['group']);
        } else {
            return this
                .http
                .get(`/api/main/group/${id}`)
                .map((response: Response) => {
                    if (response.status === 200) {
                        this.cache['group'] = response.json();
                        return this.cache['group'];
                    }

                    return Observable.of({ status: response.status });
                })
                .share()
        }
    }

    updateGroup(group: any) {
        return this
            .http
            .put(`/api/main/group/update/${group.id}`, group, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    delete this.cache['groups'];
                    return true;
                }
                return false;
            });
    }

    createGroup(group: Object): Observable<any> {
        return this
            .http
            .post(`/api/main/group/create`, group, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return false;
            });
    }

    deleteGroup(id: string): Observable<boolean> {
        return this
            .http
            .delete(`/api/main/group/remove/${id}`, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            });
    }
}
