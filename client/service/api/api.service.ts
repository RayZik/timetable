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

    private head(): RequestOptions {
        let currentUser = JSON.parse(localStorage.getItem('CurUser')) || null;
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', currentUser && currentUser.token);
        let headers = new Headers({ 'Content-Type': 'application/json' })

        return new RequestOptions({ headers: headers, search: params });
    }

    //subject
    getSubjects(): Observable<any> {
        if (this.cache['subjects']) {
            return Observable.of(this.cache['subjects']);
        } else {
            return this
                .http
                .get('/api/main/subject', this.head())
                .map((response: Response) => {
                    if (response.status === 200) {
                        this.cache['subjects'] = response.json();
                        return this.cache['subjects'];
                    }

                    return Observable.of({ status: response.status });
                })
                .share()
        }
    }

    getSubject(id: string): Observable<any> {
        if (this.cache['subject']) {
            return Observable.of(this.cache['subject']);
        } else {
            return this
                .http
                .get(`/api/main/subject/${id}`, this.head())
                .map((response: Response) => {
                    if (response.status === 200) {
                        this.cache['subject'] = response.json();
                        return this.cache['subject'];
                    }

                    return Observable.of({ status: response.status });
                })
                .share()
        }
    }

    updateSubject(subject: any): Observable<boolean> {
        return this
            .http
            .put(`/api/main/subject/update/${subject.id}`, subject, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    delete this.cache['groups'];
                    return true;
                }
                return false;
            });
    }

    createSubject(subject: Object): Observable<JSON> {
        return this
            .http
            .post(`/api/main/subject/create`, subject, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return false;
            });
    }

    deleteSubject(id: string): Observable<boolean> {
        return this
            .http
            .delete(`/api/main/subject/remove/${id}`, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            });
    }

    //teacher

    getTeachers(): Observable<any> {
        if (this.cache['teachers']) {
            return Observable.of(this.cache['teachers']);
        } else {
            return this
                .http
                .get('/api/main/teacher', this.head())
                .map((response: Response) => {
                    if (response.status === 200) {
                        this.cache['teachers'] = response.json();
                        return this.cache['teachers'];
                    }

                    return Observable.of({ status: response.status });
                })
                .share()
        }
    }

    getTeacher(id: string): Observable<any> {
        if (this.cache['teacher']) {
            return Observable.of(this.cache['teacher']);
        } else {
            return this
                .http
                .get(`/api/main/teacher/${id}`, this.head())
                .map((response: Response) => {
                    if (response.status === 200) {
                        this.cache['teacher'] = response.json();
                        return this.cache['teacher'];
                    }

                    return Observable.of({ status: response.status });
                })
                .share()
        }
    }

    updateTeacher(teacher: any): Observable<boolean> {
        return this
            .http
            .put(`/api/main/teacher/update/${teacher.id}`, teacher, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    delete this.cache['groups'];
                    return true;
                }
                return false;
            });
    }

    createTeacher(teacher: Object): Observable<JSON> {
        return this
            .http
            .post(`/api/main/teacher/create`, teacher, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return false;
            });
    }

    deleteTeacher(id: string): Observable<boolean> {
        return this
            .http
            .delete(`/api/main/teacher/remove/${id}`, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            });
    }

    //office
    getOffices(): Observable<any> {
        if (this.cache['offices']) {
            return Observable.of(this.cache['offices']);
        } else {
            return this
                .http
                .get('/api/main/office')
                .map((response: Response) => {
                    if (response.status === 200) {
                        this.cache['offices'] = response.json();
                        return this.cache['offices'];
                    }

                    return Observable.of({ status: response.status });
                })
                .share()
        }
    }

    getOffice(id: string): Observable<any> {
        if (this.cache['office']) {
            return Observable.of(this.cache['office']);
        } else {
            return this
                .http
                .get(`/api/main/office/${id}`)
                .map((response: Response) => {
                    if (response.status === 200) {
                        this.cache['office'] = response.json();
                        return this.cache['office'];
                    }

                    return Observable.of({ status: response.status });
                })
                .share()
        }
    }

    updateOffice(office: any): Observable<boolean> {
        return this
            .http
            .put(`/api/main/office/update/${office.id}`, office, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    delete this.cache['groups'];
                    return true;
                }
                return false;
            });
    }

    createOffice(office: Object): Observable<JSON> {
        return this
            .http
            .post(`/api/main/office/create`, office, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return false;
            });
    }

    deleteOffice(id: string): Observable<boolean> {
        return this
            .http
            .delete(`/api/main/office/remove/${id}`, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            });
    }

    //group
    getGroups(): Observable<any> {
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

    getGroup(id: string): Observable<any> {
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

    updateGroup(group: any): Observable<boolean> {
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

    createGroup(group: Object): Observable<JSON> {
        return this
            .http
            .post(`/api/main/group/create`, group, this.head())
            .map((response: Response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return false;
            })
            .share();
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
