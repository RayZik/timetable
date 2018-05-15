import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Http, Headers, Response, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'underscore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';



/**
 * Auth service
 */
@Injectable()
export class AuthService {
  public token: string;

  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('CurUser'));
    this.token = currentUser && currentUser.token || null;
  }

  /**
   * Login user
   * @param user - user object
   */
  loginUser(user: IUser): Observable<boolean> {
    return this
      .http
      .post('/user/auth', user)
      .map((response: Response) => {
        const res = response.json();
        if (res && res.success && res.token) {
          this.token = res.token;
          this.saveUserKey({ token: res.token });
          return true;
        }

        return false;
      });
  }

  /**
   * Save user key to the local storage
   * @param key - user key
   */
  saveUserKey(key: any): void {
    window.localStorage.setItem('CurUser', JSON.stringify(key));
  }

  /**
   * Logout user
   */
  logoutUser(): Observable<boolean> {
    this.token = null;
    window.localStorage.removeItem('CurUser');

    return this
      .http
      .get('/user/auth/logout')
      .map((response: Response) => response.status === 200 ? true : false);
  }
}



/**
 * User interface
 */
export interface IUser {
  username: string,
  password: string,
  $key?: string
}