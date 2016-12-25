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


}
