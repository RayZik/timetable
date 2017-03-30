import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { Router } from "@angular/router";

@Component({
    selector: 'tt-list-subject',
    templateUrl: "client/modules/subject/list/list.component.html"
})

export class SubjectListComponent implements OnInit {

    private subjectList: any[] = [];
    private subject: any = {};

    constructor(private subjectService: ApiService, private router: Router) { }
    ngOnInit() {
        this.refresh();
    }

    goSubjectId(id: any) {
        this.router.navigate(['/subject', id]);
    }

    newSubject(subject) {
        this.subjectService
            .createSubject(subject)
            .subscribe();
        this.refresh();
    }

    deleteSubject(id) {
        this.subjectService
            .deleteSubject(id)
            .subscribe();
        this.refresh();
    }

    refresh() {
        this.subjectService
            .getSubjects()
            .subscribe(
            (data) => { this.subjectList = data; },
            (err) => console.log(err)
            );
    }
}