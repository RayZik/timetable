import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AdminService } from './modules/admin/admin.service';
import { ApiService } from './service/api.service';
import { Router, Params } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app',
    templateUrl: 'client/app.component.html',
    providers: [ApiService, AdminService]
})

export class AppComponent {


}

