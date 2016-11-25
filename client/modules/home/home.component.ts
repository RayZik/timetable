import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../service/api.service";

@Component({
    selector: "home",
    templateUrl: "client/modules/home/home.component.html",
    providers: [ApiService]
})
export class HomeComponent implements OnInit {
    private usersArray: any[];

    constructor(private apiService: ApiService) { }
    
    ngOnInit() {
        this.apiService
            .getUsers()
            .subscribe((data) => { this.usersArray = data; });
    }
}

