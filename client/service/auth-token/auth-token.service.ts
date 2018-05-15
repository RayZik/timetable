import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';


/**
 * Auth token service
 */
@Injectable()
export class AuthTokenService {
  private _token: string;
  private _headers: Headers;
  private _params: URLSearchParams;

  constructor() {
    this._token = JSON.parse(localStorage.getItem('CurUser')) || null;
    this._headers = new Headers({ 'Content-Type': 'application/json' });
    this._params = new URLSearchParams();
  }

  /**
   * Get user token
   */
  getToken(): string {
    return this._token;
  }

  /**
   * Get request header
   */
  getHeader(): RequestOptions {
    this._params.set('token', this._token);
    return new RequestOptions({ headers: this._headers, search: this._params });
  }

  /**
   * Remove user token
   */
  deleteToken(): void {
    if (this._token) {
      localStorage.removeItem('CurUser');
    }
  }
}