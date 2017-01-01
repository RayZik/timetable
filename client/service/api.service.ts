import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { AuthHttp } from "angular2-jwt";
import { Response, Request } from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';

 

@Injectable()
export class ApiService {
    constructor(private authHttp: AuthHttp, private http: Http) { }

    get(url: string) {
        return this
            .authHttp
            .get(url)
            .map((response: Response) => response.json());
    }

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
            .get('/admin/subject')
            .map((response: Response) => response.json());
    }

    getSubject(id: any) {
        return this
            .http
            .get(`/admin/subject/${id}`)
            .map((response: Response) => response.json());
    }

    updateSubject(subject: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/admin/subject/${subject.id}`, subject, { headers: headers })
            .map((response: Response) => response.json());
    }

    //teacher

     getTeachers() {
        return this
            .http
            .get('/admin/teacher')
            .map((response: Response) => response.json());
    }

    getTeacher(id: any) {
        return this
            .http
            .get(`/admin/teacher/${id}`)
            .map((response: Response) => response.json());
    }

    updateTeacher(teacher: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/admin/teacher/${teacher.id}`, teacher, { headers: headers })
            .map((response: Response) => response.json());
    }
//office
    getOffices() {
        return this
            .http
            .get('/admin/office')
            .map((response: Response) => response.json());
    }

    getOffice(id: any) {
        return this
            .http
            .get(`/admin/office/${id}`)
            .map((response: Response) => response.json());
    }

    updateOffice(office: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this
            .http
            .post(`/admin/office/${office.id}`, office, { headers: headers })
            .map((response: Response) => response.json());
    }
}
