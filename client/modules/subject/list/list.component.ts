import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import {Router} from "@angular/router";

@Component({
    selector: 'tt-list-subject',
    templateUrl: "client/modules/subject/list/list.component.html",
    providers: [ApiService]
})

export class SubjectListComponent implements OnInit {
    
    private subjectList:any[] = [];

    constructor(private subjectService: ApiService,private router: Router) { }
    ngOnInit() {
      	this.subjectService
			.getSubjects()
			.subscribe(
			(data) => { this.subjectList = data; },
			(err) => console.log(err)
			);
    }

     goSubjectId(id: any) {
        this.router.navigate(['/subject', id]);
    }
}