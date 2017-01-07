import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { AuthHttp } from "angular2-jwt";
import { Response, Request } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ApiService {
    constructor(private authHttp: AuthHttp, private http: Http) { }

    getUsers() {
        return this
            .http
            .get('/api/home')
            .map((response: Response) => response.json());
    }

    //subject
    getSubjects() {
        return this
            .http
            .get('/api/admin/subject')
            .map((response: Response) => response.json());
    }

    getSubject(id: any) {
        return this
            .http
            .get(`/api/admin/subject/${id}`)
            .map((response: Response) => response.json());
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
        return this
            .http
            .get('/api/admin/teacher')
            .map((response: Response) => response.json());
    }

    getTeacher(id: any) {
        return this
            .http
            .get(`/api/admin/teacher/${id}`)
            .map((response: Response) => response.json());
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
        return this
            .http
            .get('/api/admin/office')
            .map((response: Response) => response.json());
    }

    getOffice(id: any) {
        return this
            .http
            .get(`/api/admin/office/${id}`)
            .map((response: Response) => response.json());
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
        return this
            .http
            .get('/api/admin/group')
            .map((response: Response) => response.json());
    }

    getGroup(id: any) {
        return this
            .http
            .get(`/api/admin/group/${id}`)
            .map((response: Response) => response.json());
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
