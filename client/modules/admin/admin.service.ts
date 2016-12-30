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
}