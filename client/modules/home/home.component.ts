import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../service/api.service";
import "rxjs/add/operator/map";

@Component({
    selector: "home",
    templateUrl: "client/home/home.component.html"
})
export class HomeComponent implements OnInit {
    private measuresArray: any[];

    constructor(private apiService: ApiService) { }
    ngOnInit() {
        this.apiService
            .getTable()
            .subscribe((data) => { this.measuresArray = data; });
    }
}