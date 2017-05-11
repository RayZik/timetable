import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class AuthTokenService {
    private token: string;
    private headers: Headers;
    private params: URLSearchParams;

    constructor() {
        this.token = JSON.parse(localStorage.getItem('CurUser')) || null;
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.params = new URLSearchParams();
    }

    getToken(): string {
        return this.token;
    }

    getHeader(): RequestOptions {
        this.params.set('token', this.token);
        return new RequestOptions({ headers: this.headers, search: this.params });
    }

    deleteToken(): void {
        if (this.token) {
            localStorage.removeItem('CurUser');
        }
    }
}