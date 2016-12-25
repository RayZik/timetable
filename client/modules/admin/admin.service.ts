import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AdminService {
    constructor(private authHttp: AuthHttp, private http: Http) { }

    get(url: string) {
        return this
            .authHttp
            .get(url)
            .map((response: Response) => response.json());
    }

    getTimetable() {
        return this
            .http
            .get('/admin')
            .map((response: Response) => response.json());
    }

    updateTable(items: any) {
        let params ={
            id: items._id,
            timeEnd: items.time[0].end,
            timeBegin: items.time[0].begin,
            subject: items._subject[0].name,
            tName: items._teacher[0].name,
            tLName: items._teacher[0].lastName,
            group: items._group[0].name,
            office: items._office[0].name
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this
            .http
            .post('/admin', params, headers)
            .map((response: Response) => response.json());
    }
}