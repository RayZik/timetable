import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Http, Headers, Response, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'underscore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    public token: string;

    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('CurUser'));
        this.token = currentUser && currentUser.token;
    }

    loginUser(user: IUser): Observable<boolean> {
        return this
            .http
            .post('/user/auth', user)
            .map((response: Response) => {
                let res = response.json(); 
                if (res.success && res.token) {
                    this.token = res.token;
                    this.saveUserKey({ username: user.username, token: res.token });
                    return true;
                }

                return false;
            });
    }

    saveUserKey(key: Object) {
        window.localStorage.setItem('CurUser', JSON.stringify(key));
    }

    logoutUser() {
        this.token = null;
        window.localStorage.removeItem('CurUser');
    }
}

export interface IUser {
    username: string,
    password: string,
    $key?: string
}