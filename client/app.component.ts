import { Component, OnInit } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { ApiService } from "./service/api.service";
import { SemanticPopupComponent } from "ng-semantic";
import "rxjs/add/operator/map";

@Component({
    selector: "app",
    templateUrl: "client/app.component.html",
    providers: [ApiService]
})

export class AppComponent implements OnInit {

    private isLogged: boolean;
    private usersArray: any = {};

    constructor(private http: Http, private apiService: ApiService) { }

    ngOnInit() {
        this.apiService
            .getUsers()
            .subscribe((data) => { this.usersArray = data; });
    }

    login(username: String, password: String) {
        console.log(this.usersArray);

        this.isLogged = true;
    }

    logout() {
        this.isLogged = false;
    }
}