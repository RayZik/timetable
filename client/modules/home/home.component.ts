import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
    selector: 'tt-home',
    templateUrl: 'client/modules/home/home.component.html'
})
export class HomeComponent implements OnInit {
    private usersArray: any[];
    private isLogged: boolean;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
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

