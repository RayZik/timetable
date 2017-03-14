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
    @Input() dateList;

    private holidayList: any[] = [];
    private cellWithTime: any[] = [];
    private teachers: any[] = [];
    private subjects: any[] = [];
    private offices: any[] = [];
    private groups: any[] = [];



    private configFilter: any = {
        date: {
            next: false,
            prev: false
        },
        subject: '',
        teacher: '',
        group: '',
        office: ''
    };


    constructor(private adminService: AdminService, private apiService: ApiService) { }

    ngOnInit(): void {
        this.adminService
            .getHolidays()
            .subscribe((data) => {
                this.holidayList = data;
            })

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
        let res = {
            dateList: [],
            cells: []
        };
        if (configFilter.date.next || configFilter.date.prev) {

            let firstDayWeek = moment(this.dateList[0].day);
            let lastDayWeek = moment(this.dateList[6].day);
            if (configFilter.date.next) {
                for (let i = 0; i < 7; i++) {
                    let endDay = moment(lastDayWeek).day() + 1;
                    let date = moment(lastDayWeek).day(endDay + i);

                    let cont = this.holidayList[0].date.find((elem) => date.isSame(moment(elem)));
                    if (cont) {
                        res.dateList.push({ day: date.toDate(), isHoliday: true });
                    } else {
                        res.dateList.push({ day: date.toDate(), isHoliday: false });
                    }

                }
                this.configFilter.date.next = false;
            }

            if (configFilter.date.prev) {
                for (let i = 6; i >= 0; i--) {
                    let beginDay = moment(firstDayWeek).day() - 1;
                    let date = moment(firstDayWeek).day(beginDay - i);
                    let cont = this.holidayList[0].date.find((elem) => date.isSame(moment(elem)));
                    if (cont) {
                        res.dateList.push({ day: date.toDate(), isHoliday: true });
                    } else {
                        res.dateList.push({ day: date.toDate(), isHoliday: false });
                    }

                }
                this.configFilter.date.prev = false;
            }

            this.cellWithTime.forEach((cell) => {
                let timeCell = [];
                cell.time.forEach(time => {
                    if (moment(time.begin).isAfter(res.dateList[0].day) && moment(time.end).isBefore(res.dateList[6].day)) {
                        timeCell.push(time)
                    }
                });

                if (timeCell.length > 0) {
                    cell.time.push(timeCell);
                    res.cells.push(cell)
                }
            });


            res.cells = this.checkParams(res.cells);
            this.onChanged.emit(res);

        } else {
            res.cells = this.checkParams(this.cellWithTime);
            this.onChanged.emit(res);
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
