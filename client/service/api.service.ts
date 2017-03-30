import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { AuthHttp } from "angular2-jwt";
import { Response, Request } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/operator/share";
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ApiService {
    private cache: Object = {};

    constructor(private authHttp: AuthHttp, private http: Http) { }

    getUsers() {
        if (this.cache['users']) {
            return Observable.of(this.cache['users']);
        } else {
            return this
                .http
                .get('/api/home')
                .map((response: Response) => {
                    this.cache['users'] = response.json();
                    return this.cache['users'];
                })
                .share()
        }
    }

    //subject
    getSubjects() {
        if (this.cache['subjects']) {
            return Observable.of(this.cache['subjects']);
        } else {
            return this
                .http
                .get('/api/admin/subject')
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
                .get(`/api/admin/subject/${id}`)
                .map((response: Response) => {
                    this.cache['subject'] = response.json();
                    return this.cache['subject'];
                })
                .share()
        }
    }

    updateSubject(subject: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .put(`/api/admin/subject/update/${subject.id}`, subject, { headers: headers })
            .map((response: Response) => response);
    }

    createSubject(subject) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/admin/subject/create`, subject, { headers: headers })
            .map((response: Response) => response);
    }

    deleteSubject(id: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .delete(`/api/admin/subject/remove/${id}`, { headers: headers })
            .map((response: Response) => response);
    }

    //teacher

    getTeachers() {
        if (this.cache['teachers']) {
            return Observable.of(this.cache['teachers']);
        } else {
            return this
                .http
                .get('/api/admin/teacher')
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
                .get(`/api/admin/teacher/${id}`)
                .map((response: Response) => {
                    this.cache['teacher'] = response.json();
                    return this.cache['teacher'];
                })
                .share()
        }
    }

    updateTeacher(teacher: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .put(`/api/admin/teacher/update/${teacher.id}`, teacher, { headers: headers })
            .map((response: Response) => response);
    }

    createTeacher(teacher) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/admin/teacher/create`, teacher, { headers: headers })
            .map((response: Response) => response);
    }

    deleteTeacher(id: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .delete(`/api/admin/teacher/remove/${id}`, { headers: headers })
            .map((response: Response) => response);
    }

    //office
    getOffices() {
        if (this.cache['offices']) {
            return Observable.of(this.cache['offices']);
        } else {
            return this
                .http
                .get('/api/admin/office')
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
                .get(`/api/admin/office/${id}`)
                .map((response: Response) => {
                    this.cache['office'] = response.json();
                    return this.cache['office'];
                })
                .share()
        }
    }

    updateOffice(office: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .put(`/api/admin/office/update/${office.id}`, office, { headers: headers })
            .map((response: Response) => response);
    }

    createOffice(office: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/admin/office/create`, office, { headers: headers })
            .map((response: Response) => response);
    }

    deleteOffice(id: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .delete(`/api/admin/office/remove/${id}`, { headers: headers })
            .map((response: Response) => response);
    }

    //group
    getGroups() {
        if (this.cache['groups']) {
            return Observable.of(this.cache['groups']);
        } else {
            return this
                .http
                .get('/api/admin/group')
                .map((response: Response) => {
                    this.cache['groups'] = response.json();
                    return this.cache['groups'];
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
                .get(`/api/admin/group/${id}`)
                .map((response: Response) => {
                    this.cache['group'] = response.json();
                    return this.cache['group'];
                })
                .share()
        }
    }

    updateGroup(group: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .put(`/api/admin/group/update/${group.id}`, group, { headers: headers })
            .map((response: Response) => response);
    }

    createGroup(group) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/api/admin/group/create`, group, { headers: headers })
            .map((response: Response) => response);
    }

    deleteGroup(id: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .delete(`/api/admin/group/remove/${id}`, { headers: headers })
            .map((response: Response) => response);
    }
}
