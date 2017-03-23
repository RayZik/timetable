import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AdminService } from '../../modules/admin/admin.service';
import { ApiService } from '../../service/api.service';
import moment from 'moment';

@Component({
    selector: 'tt-filter',
    templateUrl: "client/components/filter-timetable/filter.component.html",
    styleUrls: ['client/components/filter-timetable/filter.component.css'],
    providers: [ApiService],
})

export class FilterComponent implements OnInit {
    @Output() onChanged = new EventEmitter<any>();
    @Input() dateList;

    private holidayList: any[] = [];
    private cellWithTime: any[] = [];
    private teachers = [];
    private subjects: any[] = [];
    private offices: any[] = [];
    private groups: any[] = [];
    private searchListTeacher: any[] = [];
    private searchListSubject: any[] = [];
    private searchListGroup: any[] = [];
    private searchListOffice: any[] = [];

    private configFilter: any = {
        date: {
            next: false,
            prev: false
        },
        subject: [],
        teacher: [],
        group: [],
        office: []
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
            (data) => {
                this.teachers = data;
            },
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

    search(term: string, sign: string) {
        term = term.toLowerCase();

        if (sign === 't') {
            this.searchListTeacher = [];
        }
        if (sign === 'g') {
            this.searchListGroup = [];
        }
        if (sign === 's') {
            this.searchListSubject = [];
        }
        if (sign === 'o') {
            this.searchListOffice = [];
        }

        if (term.length != 0) {
            if (sign === 't') {
                this.teachers.forEach(t => {
                    let result = t.surname + ' ' + t.name + ' ' + t.lastName;
                    let strToLower = (t.surname + t.name + t.lastName).toLowerCase();

                    if (strToLower.indexOf(term) != -1) {
                        this.searchListTeacher.push(result);
                    }
                    this.searchListTeacher.sort();
                });
            }

            if (sign === 'g') {
                this.groups.forEach(g => {
                    let result = g.name;
                    let strToLower = (g.name).toLowerCase();

                    if (strToLower.indexOf(term) != -1) {
                        this.searchListGroup.push(result);
                    }
                });
                this.searchListGroup.sort();
            }

            if (sign === 's') {
                this.subjects.forEach(s => {
                    let result = s.name;
                    let strToLower = (s.name).toLowerCase();

                    if (strToLower.indexOf(term) != -1) {
                        this.searchListSubject.push(result);
                    }
                });
                this.searchListSubject.sort();
            }

            if (sign === 'o') {
                this.offices.forEach(o => {
                    let result = o.name;
                    let strToLower = (o.name).toLowerCase();

                    if (strToLower.indexOf(term) != -1) {
                        this.searchListOffice.push(result);
                    }
                });
                this.searchListOffice.sort();
            }
        }
    }

    //Teacher Search
    selectTeacher(teacher) {
        let idxChecked = this.configFilter.teacher.indexOf(teacher.value);
        let idxSearch = this.searchListTeacher.indexOf(teacher.value);

        if (teacher.checked) {
            if (idxChecked === -1 && idxSearch != -1) {
                this.configFilter.teacher.push(teacher.value);
                this.searchListTeacher.splice(idxSearch, 1);
            } else {
                this.searchListTeacher.splice(idxSearch, 1);
            }
        } else {
            if (idxChecked != -1 && idxSearch === -1) {
                this.searchListTeacher.push(teacher.value);
                this.configFilter.teacher.splice(idxChecked, 1);
            } else {
                this.searchListTeacher.splice(idxSearch, 1);
            }
        }
        this.searchListTeacher.sort();
        this.configFilter.teacher.sort();
        this.change();
    }



    //search Subject
    selectSubject(subject) {
        let idxChecked = this.configFilter.subject.indexOf(subject.value);
        let idxSearch = this.searchListSubject.indexOf(subject.value);

        if (subject.checked) {
            if (idxChecked === -1 && idxSearch != -1) {
                this.configFilter.subject.push(subject.value);
                this.searchListSubject.splice(idxSearch, 1);
            } else {
                this.searchListSubject.splice(idxSearch, 1);
            }
        } else {
            if (idxChecked != -1 && idxSearch === -1) {
                this.searchListSubject.push(subject.value);
                this.configFilter.subject.splice(idxChecked, 1);
            } else {
                this.searchListSubject.splice(idxSearch, 1);
            }
        }
        this.searchListSubject.sort();
        this.configFilter.subject.sort();
        this.change();
    }

    //search group
    selectGroup(group) {
        let idxChecked = this.configFilter.group.indexOf(group.value);
        let idxSearch = this.searchListGroup.indexOf(group.value);

        if (group.checked) {
            if (idxChecked === -1 && idxSearch != -1) {
                this.configFilter.group.push(group.value);
                this.searchListGroup.splice(idxSearch, 1);
            } else {
                this.searchListGroup.splice(idxSearch, 1);
            }
        } else {
            if (idxChecked != -1 && idxSearch === -1) {
                this.searchListGroup.push(group.value);
                this.configFilter.group.splice(idxChecked, 1);
            } else {
                this.searchListGroup.splice(idxSearch, 1);
            }
        }
        this.searchListGroup.sort();
        this.configFilter.group.sort();
        this.change();
    }

    //search office
    selectOffice(office) {
        let idxChecked = this.configFilter.office.indexOf(office.value);
        let idxSearch = this.searchListOffice.indexOf(office.value);

        if (office.checked) {
            if (idxChecked === -1 && idxSearch != -1) {
                this.configFilter.office.push(office.value);
                this.searchListOffice.splice(idxSearch, 1);
            } else {
                this.searchListOffice.splice(idxSearch, 1);
            }
        } else {
            if (idxChecked != -1 && idxSearch === -1) {
                this.searchListOffice.push(office.value);
                this.configFilter.office.splice(idxChecked, 1);
            } else {
                this.searchListOffice.splice(idxSearch, 1);
            }
        }
        this.searchListOffice.sort();
        this.configFilter.office.sort();
        this.change();
    }

    change() {
        let res = {
            dateList: [],
            cells: []
        };

        if (this.configFilter.date.next || this.configFilter.date.prev) {

            let firstDayWeek = moment(this.dateList[0].day);
            let lastDayWeek = moment(this.dateList[6].day);
            if (this.configFilter.date.next) {
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

            if (this.configFilter.date.prev) {
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

            if (this.configFilter.group.length > 0) {
                a.push(this.configFilter.group.some(cfGroup =>
                    cell.group.some(group => {
                        let str = group.name;
                        return str === cfGroup;
                    })
                ))
            }

            if (this.configFilter.office.length > 0) {
                a.push(this.configFilter.office.some(cfOffice =>
                    cell.office.some(office => {
                        let str = office.name;
                        return str === cfOffice;
                    })
                ))
            }

            if (this.configFilter.subject.length > 0) {
                a.push(this.configFilter.subject.some(cfSubject =>
                    cell.subject.some(subject => {
                        let str = subject.name;
                        return str === cfSubject;
                    })
                ))
            }

            if (this.configFilter.teacher.length > 0) {
                a.push(this.configFilter.teacher.some(cfTeacher =>
                    cell.teacher.some(teacher => {
                        let str = teacher.surname + ' ' + teacher.name + ' ' + teacher.lastName;
                        return str === cfTeacher;
                    })
                ));
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
