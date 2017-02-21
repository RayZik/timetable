import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AdminService } from '../../modules/admin/admin.service';
import { ApiService } from '../../service/api.service';
import moment from 'moment';

@Component({
    selector: 'tt-filter',
    templateUrl: "client/components/filter-timetable/filter.component.html",
    providers: [ApiService],
})

export class FilterComponent implements OnInit {
    @Output() onChanged = new EventEmitter<any>();

    private teachers: any[] = [];
    private subjects: any[] = [];
    private offices: any[] = [];
    private groups: any[] = [];
    private cellWithTime = [];


    private configFilter: any = {
        date: {
            begin: '',
            end: ''
        },
        subject: '',
        teacher: '',
        group: '',
        office: ''
    };

    private res = {
        date: {
            begin: '',
            end: ''
        },
        cells: []
    };

    constructor(private adminService: AdminService, private apiService: ApiService) { }

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

        this.adminService
            .getCellTimetable()
            .subscribe((cells) => {
                this.cellWithTime = [];
                cells.forEach(cell => {
                    if (cell.time.length > 0) {
                        this.cellWithTime.push(cell);
                    }
                });
            });
    }

    change(configFilter) {
        if (configFilter.date.begin != '' && configFilter.date.end != '') {
            this.res = {
                date: {
                    begin: configFilter.date.begin,
                    end: configFilter.date.end
                },
                cells: []
            };

            let begin = moment(configFilter.date.begin);
            let end = moment(configFilter.date.end).utc();

            this.cellWithTime.filter((cell) => {
                let timeCell = [];
                cell.time.forEach(time => {
                    if (moment(time.begin).isAfter(begin) && moment(time.end).isBefore(end)) {
                        timeCell.push(time)
                    }
                });
                if (timeCell.length > 0) {
                    cell.time = timeCell;
                    this.res.cells.push(cell)
                }
            });
            if (this.res.cells.length > 0) {
                this.res.cells = this.checkParams(this.res.cells);
                this.onChanged.emit(this.res);
            }
        } else {
            this.res.cells = this.checkParams(this.cellWithTime);
            this.onChanged.emit(this.res);
        }
    }

    checkParams(cells) {
        let result = [];
        cells.forEach(cell => {
            let a = [];
            if (this.configFilter.subject != '') {
                cell.subject.forEach(subject => {
                    if (subject.name === this.configFilter.subject) {
                        a.push(true);
                    } else {
                        a.push(false);
                    }
                });
            }

            if (this.configFilter.group != '') {
                cell.group.forEach(group => {
                    if (group.name === this.configFilter.group) {
                        a.push(true);
                    } else {
                        a.push(false);
                    }
                });
            }

            if (this.configFilter.office != '') {
                cell.office.forEach(office => {
                    if (office.name === this.configFilter.office) {
                        a.push(true);
                    } else {
                        a.push(false);
                    }
                });
            }

            if (this.configFilter.teacher != '') {
                cell.teacher.forEach(teacher => {
                    let str = teacher.name + teacher.lastName;
                    if (str === this.configFilter.teacher) {
                        a.push(true);
                    } else {
                        a.push(false);
                    }
                });
            }
            if (this.contains(a, false) !== false) {
                result.push(cell);
            }
        });
        return result;
    }

    contains(arr, elem) {
        if (arr.length > 0) {
            return arr.find((bool) => bool === elem);
        } else {
            return -1;
        }
    }

}