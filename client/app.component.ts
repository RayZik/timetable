import { Component, OnInit } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { ApiService } from "./service/api.service";
import { Router, Params } from "@angular/router";
import "rxjs/add/operator/map";

@Component({
    selector: "app",
    templateUrl: "client/app.component.html",
    providers: [ApiService]
})

export class AppComponent  {

    // private isLogged: boolean;
    // private usersArray = {};
    // private response = {};
    // constructor(private apiService: ApiService, private router: Router) { }
    // refresh() {
    //     this.apiService
    //         .getUsers()
    //         .subscribe((data) => { this.usersArray = data; },
    //         (err) => { console.log(err) });
    //     console.log(this.response);
    // }
    // ngOnInit() {
    //     this.refresh();
    // }

    // login(username: String, password: String) {
    //     this.apiService
    //         .postUser(username, password)
    //         .subscribe(
    //         (res: Response) => {
    //             this.response = res;
    //             this.isLogged = true;
    //             this.refresh();
    //         },
    //         (error: Error) => { console.log(error); }
    //         ),
    //         () => console.log('done');

    // }

    // logout() {
    //     this.isLogged = false;
    //     this.router.navigate(['/']);
    // }




}