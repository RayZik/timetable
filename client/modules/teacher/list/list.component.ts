import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import {Router} from "@angular/router";

@Component({
    selector: 'tt-list-teacher',
    templateUrl: "client/modules/teacher/list/list.component.html",
    providers: [ApiService]
})

export class TeacherListComponent implements OnInit {
    
    private teacherList:any[] = [];

    constructor(private teacherService: ApiService,private router: Router) { }
    ngOnInit() {
      	this.teacherService
			.getTeachers()
			.subscribe(
			(data) => { this.teacherList = data; },
			(err) => console.log(err)
			);
    }

     goTeacherId(id: any) {
        this.router.navigate(['/teacher', id]);
    }
}