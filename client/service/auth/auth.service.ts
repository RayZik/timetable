import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'underscore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    user: IUser = null;
    private users: any[] = [];

    constructor(private http: Http) {
        this.getUsers();
    }

    getUsers() {
        return this.http
            .get('/user/login')
            .map((response: Response) => {
                return response.json();
            })
            .forEach(data => {
                this.users = data;
            });
    }

    getUsersById(id: string): Observable<IUser> {
        return this.http
            .get(`/user/login/${id}`)
            .map((response: Response) => {
                return response.json();
            })
            .do(usr => {
                this.user = usr;
            })
    }

    loginUser(user: IUser): Observable<IUser> {
        let usr = _.findWhere(this.users, { password: user.password, username: user.username })
        if (usr) {

            this.user = {
                username: user.username,
                password: user.password,
                $key: usr._id
            }
            this.saveUserKey(this.user.$key);
            return Observable.of(this.user);
        }
        return Observable.of(null);


    }

    loadUser(): Promise<IUser> {
        let userKey = window.localStorage.getItem('user');

        if (!userKey) {
            return Promise.resolve(null);
        }
        return this.getUsersById(userKey).toPromise();
    }

    saveUserKey(key: string) {
        window.localStorage.setItem('user', key);
    }
}

// асус в150мк 4650
// коре ай 5 6400 4яд 12000
// кингстоун 8гб 4150

export interface IUser {
    username: string,
    password: string,
    $key?: string
}