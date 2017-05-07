import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService, IUser } from '../../service/index';

@Component({
    selector: 'tt-login',
    templateUrl: 'client/components/login/login.component.html'
})
export class LoginComponent implements OnInit {

    private user: IUser = {
        username: '1',
        password: '12'
    }

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {

    }

    login(form: NgForm) {

        if (form.invalid) {
            return;
        }

        this.authService
            .loginUser(this.user)
            .subscribe(isLogin => {
                if (isLogin) {
                    this.router.navigate(['/main']);
                }
            })
    }

    logout() {
        this.authService.logoutUser();
    }
}

