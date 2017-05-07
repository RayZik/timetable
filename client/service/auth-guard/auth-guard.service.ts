import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from '../index';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(): boolean {
        let auth = localStorage.getItem('CurUser');
        if (auth === null) {
            this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }
    }
}