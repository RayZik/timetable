import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import moment from 'moment';

import { ApiService, MainService } from '../../service/index';

@Component({
    selector: 'tt-filter',
    templateUrl: 'client/components/filter-timetable/filter.component.html',
    styleUrls: ['client/components/filter-timetable/filter.component.css']
})

export class FilterComponent implements OnInit {
    @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();
    @Input() dateList;
    @Input() cellWithTime;
    @Input() paramQuery;

    private data: any[] = [];
    private holidayList: any[] = [];
    private teachers = [];
    private subjects: any[] = [];
    private offices: any[] = [];
    private groups: any[] = [];
    private searchListTeacher: any[] = [];
    private searchListSubject: any[] = [];
    private searchListGroup: any[] = [];
    private searchListOffice: any[] = [];
    private idForSearch: any[] = [];
    private obj: Object = {};
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


    constructor(private mainService: MainService, private apiService: ApiService) { }

    ngOnInit(): void {
        this.mainService
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

        // if (Object.keys(this.paramQuery).length > 0) {
        //     this.mainService
        //         .getTimeLessonById(this.paramQuery.id)
        //         .subscribe(data => {
        //             this.data = data;
        //             this.useParamQuery(this.paramQuery)
        //         })
        // }
    }

    useParamQuery(param): void {
        let date = this.paramQuery.date.begin;
        let config = this.paramQuery.configFilter;

        if (!!date) {

            this.change();
        } else {

        }

    }


    search(term: string, sign: string): void {
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

        if (term.length !== 0) {
            if (sign === 't') {
                this.obj['searchListTeacher'] = this.teachers.filter(t => {
                    let strToLower = (t.surname + t.name + t.lastName).toLowerCase();
                    return strToLower.indexOf(term) !== -1;
                });

                this.searchListTeacher = this.obj['searchListTeacher'].filter(el => {
                    return this.idForSearch.indexOf(el._id) === -1;
                });
                this.searchListTeacher.sort();
            }

            if (sign === 'g') {
                this.obj['searchListGroup'] = this.groups.filter(g => {
                    let strToLower = (g.name).toLowerCase();
                    return strToLower.indexOf(term) !== -1;
                });

                this.searchListGroup = this.obj['searchListGroup'].filter(el => {
                    return this.idForSearch.indexOf(el._id) === -1;
                });
                this.searchListGroup.sort();
            }

            if (sign === 's') {
                this.obj['searchListSubject'] = this.subjects.filter(s => {
                    let strToLower = (s.name).toLowerCase();
                    return strToLower.indexOf(term) !== -1;
                });

                this.searchListSubject = this.obj['searchListSubject'].filter(el => {
                    return this.idForSearch.indexOf(el._id) === -1;
                });

                this.searchListSubject.sort();
            }

            if (sign === 'o') {
                this.obj['searchListOffice'] = this.offices.filter(o => {
                    let strToLower = (o.name).toLowerCase();
                    return strToLower.indexOf(term) !== -1;
                });

                this.searchListOffice = this.obj['searchListOffice'].filter(el => {
                    return this.idForSearch.indexOf(el._id) === -1;
                });

                this.searchListOffice.sort();
            }
        }
    }


    selectTeacher(t: any, id: string): void {
        if (t.checked) {
            this.idForSearch.push(id);
            this.configFilter.teacher = this.teachers.filter(el => {
                return this.idForSearch.indexOf(el._id) !== -1;
            });

            this.searchListTeacher = this.obj['searchListTeacher'].filter(el => {
                return this.idForSearch.indexOf(el._id) === -1;
            });

        } else {
            this.idForSearch = this.idForSearch.filter(el => { return el !== id });
            this.configFilter.teacher = this.teachers.filter(el => {
                return this.idForSearch.indexOf(el._id) !== -1;
            });

            this.searchListTeacher = this.obj['searchListTeacher'].filter(el => {
                return this.idForSearch.indexOf(el._id) === -1;
            });
        }

        this.searchListTeacher.sort();
        this.configFilter.teacher.sort();
        this.change();
    }


    selectSubject(s: any, id: string): void {
        if (s.checked) {
            this.idForSearch.push(id);
            this.configFilter.subject = this.subjects.filter(el => {
                return this.idForSearch.indexOf(el._id) !== -1;
            });

            this.searchListSubject = this.obj['searchListSubject'].filter(el => {
                return this.idForSearch.indexOf(el._id) === -1;
            });

        } else {
            this.idForSearch = this.idForSearch.filter(el => { return el !== id });
            this.configFilter.subject = this.subjects.filter(el => {
                return this.idForSearch.indexOf(el._id) !== -1;
            });

            this.searchListSubject = this.obj['searchListSubject'].filter(el => {
                return this.idForSearch.indexOf(el._id) === -1;
            });
        }

        this.searchListSubject.sort();
        this.configFilter.subject.sort();
        this.change();
    }

    selectGroup(g: any, id: string): void {
        if (g.checked) {
            this.idForSearch.push(id);
            this.configFilter.group = this.groups.filter(el => {
                return this.idForSearch.indexOf(el._id) !== -1;
            });

            this.searchListGroup = this.obj['searchListGroup'].filter(el => {
                return this.idForSearch.indexOf(el._id) === -1;
            });

        } else {
            this.idForSearch = this.idForSearch.filter(el => { return el !== id });
            this.configFilter.group = this.groups.filter(el => {
                return this.idForSearch.indexOf(el._id) !== -1;
            });

            this.searchListGroup = this.obj['searchListGroup'].filter(el => {
                return this.idForSearch.indexOf(el._id) === -1;
            });
        }

        this.searchListGroup.sort();
        this.configFilter.group.sort();
        this.change();
    }

    selectOffice(o: any, id: string): void {

        if (o.checked) {
            this.idForSearch.push(id);
            this.configFilter.office = this.offices.filter(el => {
                return this.idForSearch.indexOf(el._id) !== -1;
            });

            this.searchListOffice = this.obj['searchListOffice'].filter(el => {
                return this.idForSearch.indexOf(el._id) === -1;
            });

        } else {
            this.idForSearch = this.idForSearch.filter(el => { return el !== id });
            this.configFilter.office = this.offices.filter(el => {
                return this.idForSearch.indexOf(el._id) !== -1;
            });

            this.searchListOffice = this.obj['searchListOffice'].filter(el => {
                return this.idForSearch.indexOf(el._id) === -1;
            });
        }

        this.searchListOffice.sort();
        this.configFilter.office.sort();

        this.change();
    }

    change(): void {
        let res = {
            dateList: [],
            cells: [],
            data: {}
        };

        if ((this.configFilter.date.next || this.configFilter.date.prev)) {

            // if (this.paramQuery['date']) {
            //     console.log(1)
            //     this.configFilter.date.next = false;
            //     this.configFilter.date.prev = false;

            //     let dateString = moment(this.paramQuery.date.begin);

            //     for (let i = 0; i < 7; i++) {
            //         let firstDay = moment(dateString).day();
            //         let date = moment(dateString).day(firstDay + i);
            //         // let cont = this.holidayList[0].date.find((elem) => date.isSame(moment(elem)));
            //         // if (cont) {
            //         //     res.dateList.push({ day: date.toISOString(), isHoliday: true });
            //         // } else {
            //         res.dateList.push({ day: date.toISOString(), isHoliday: false });
            //         // }
            //     }

            //     if (this.data !== {}) {

            //         res.data = this.data;
            //     }
            // }

            if (this.configFilter.date.next) {
                let firstDayWeek = moment(this.dateList[0].day);
                let lastDayWeek = moment(this.dateList[6].day);

                for (let i = 0; i < 7; i++) {
                    let endDay = moment(lastDayWeek).day() + 1;
                    let date = moment(lastDayWeek).day(endDay + i);

                    let cont = this.holidayList[0].date.find((elem) => date.isSame(moment(elem)));
                    if (cont) {
                        res.dateList.push({ day: date.toISOString(), isHoliday: true });
                    } else {
                        res.dateList.push({ day: date.toISOString(), isHoliday: false });
                    }

                }
                this.configFilter.date.next = false;
            }

            if (this.configFilter.date.prev) {
                let firstDayWeek = moment(this.dateList[0].day);
                let lastDayWeek = moment(this.dateList[6].day);

                for (let i = 6; i >= 0; i--) {
                    let beginDay = moment(firstDayWeek).day() - 1;
                    let date = moment(firstDayWeek).day(beginDay - i);
                    let cont = this.holidayList[0].date.find((elem) => date.isSame(moment(elem)));
                    if (cont) {
                        res.dateList.push({ day: date.toISOString(), isHoliday: true });
                    } else {
                        res.dateList.push({ day: date.toISOString(), isHoliday: false });
                    }
                }
                this.configFilter.date.prev = false;
            }

            this.cellWithTime.forEach((cell) => {
                let timeCell = [];
                cell.time.forEach(time => {
                    let isBef = moment(time.end).isBefore(moment(res.dateList[6].day).add(1, 'day'));
                    let isAf = moment(time.begin).isAfter(res.dateList[0].day);

                    if (isAf && isBef) {
                        timeCell.push(time);
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


    checkParams(cells: any[]): any[] {
        let result = [];
        cells.forEach(cell => {
            let a = [];

            if (this.configFilter.group.length > 0) {
                a.push(this.configFilter.group.some(cfGroup =>
                    cell.group.some(group => {
                        return group._id === cfGroup._id;
                    })
                ))
            }

            if (this.configFilter.office.length > 0) {
                a.push(this.configFilter.office.some(cfOffice =>
                    cell.office.some(office => {
                        return office._id === cfOffice._id;
                    })
                ))
            }

            if (this.configFilter.subject.length > 0) {
                a.push(this.configFilter.subject.some(cfSubject =>
                    cell.subject.some(subject => {
                        return subject._id === cfSubject._id;
                    })
                ))
            }

            if (this.configFilter.teacher.length > 0) {
                a.push(this.configFilter.teacher.some(cfTeacher =>
                    cell.teacher.some(teacher => {
                        return teacher._id === cfTeacher._id;
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
