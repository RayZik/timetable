import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../service/index';

@Component({
    selector: 'tt-list-subject',
    templateUrl: 'client/modules/subject/list/list.component.html'
})

export class SubjectListComponent implements OnInit {
    private subjectList: any[] = [];
    private subject: Object = {};

    constructor(private subjectService: ApiService, private router: Router) { }
    ngOnInit() {
        this.subjectService
            .getSubjects()
            .subscribe(
            (data) => { this.subjectList = data; },
            (err) => console.log(err)
            );
    }

    goSubjectId(id: String) {
        this.router.navigate(['/subject', id]);
    }

    newSubject(subject: any) {
        this.subjectService
            .createSubject(subject)
            .subscribe();
    }

    deleteSubject(id: String) {
        this.subjectService
            .deleteSubject(id)
            .subscribe();
    }
}