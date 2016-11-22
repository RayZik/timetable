import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../service/api.service";
import "rxjs/add/operator/map";

@Component({
    selector: "fan",
    templateUrl: "client/modules/home/home.component.html",
    providers: [ApiService]
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