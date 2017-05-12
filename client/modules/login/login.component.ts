import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService, IUser } from '../../service/index';

@Component({
    selector: 'tt-login',
    templateUrl: 'client/modules/login/login.component.html'
})
export class LoginComponent implements OnInit {
    private isAuth: boolean;
    private user: IUser = {
        username: '1',
        password: '12'
    }

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.isAuth = !!localStorage.getItem('CurUser');
    }

    login(form: NgForm) {

        if (form.invalid) {
            return;
        }

        this.authService
            .loginUser(this.user)
            .subscribe(isLogin => {
                if (isLogin) {
                    this.isAuth = true;
                    this.router.navigate(['/main']);
                }
            })
    }

    logout() {
        this.authService.logoutUser().
            subscribe(isLogout => {
                if (isLogout) {
                    this.isAuth = false;
                    this.router.navigate(['/login']);
                }
            });
    }
}

