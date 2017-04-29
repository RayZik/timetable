import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../service/index';

@Component({
    selector: 'tt-login',
    templateUrl: 'client/modules/login/login.component.html'
})
export class LoginComponent implements OnInit {
    private usersArray: any[];
    private isLogged: boolean;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.apiService
            .getUsers()
            .subscribe((data) => { this.usersArray = data; });
    }

    login(username: String, password: String) {
        if (username === 'admin' && password === 'admin') {
            this.isLogged = true;
        }
    }
}

