import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../../modules/admin/admin.service';
import { ApiService } from '../../service/api.service';

@Component({
    selector: 'tt-filter',
    templateUrl: "client/components/filter-timetable/filter.component.html",
    providers: [ApiService],
})

export class FilterComponent implements OnInit {
    @Input() configFilter;
    private teachers: any[];
    private subjects: any[];
    private offices: any[];
    private groups: any[];

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService
            .getTeachers()
            .subscribe(
            (data) => { this.teachers = data; },
            (err) => console.log(err)
            );

        this.apiService
            .getGroups()
            .subscribe(
            (data) => { this.groups = data; },
            (err) => console.log(err)
            );

        this.apiService
            .getOffices()
            .subscribe(
            (data) => { this.offices = data; },
            (err) => console.log(err)
            );

        this.apiService
            .getSubjects()
            .subscribe(
            (data) => { this.subjects = data; },
            (err) => console.log(err)
            );

            console.log(this.configFilter)
    }
}