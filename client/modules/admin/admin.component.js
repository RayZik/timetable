System.register(["@angular/core", "./admin.service", "../../service/api.service", "ng2-dragula/ng2-dragula", "moment"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, admin_service_1, api_service_1, ng2_dragula_1, moment_1, AdminComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (admin_service_1_1) {
                admin_service_1 = admin_service_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (ng2_dragula_1_1) {
                ng2_dragula_1 = ng2_dragula_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }
        ],
        execute: function () {
            AdminComponent = (function () {
                function AdminComponent(adminService, apiService, dragulaService) {
                    var _this = this;
                    this.adminService = adminService;
                    this.apiService = apiService;
                    this.dragulaService = dragulaService;
                    this.cellTimetable = [];
                    this.cellWithTime = [];
                    this.timeList = [];
                    this.holidayList = [];
                    this.lesson = {};
                    this.newDate = {};
                    this.dateList = [];
                    this.dataForModalWindow = {};
                    this.showModal = false;
                    //cell
                    this.showSaveModal = false;
                    this.showSaveButton = true;
                    dragulaService.dropModel.subscribe(function (value) {
                        _this.onDropModel(value.slice(1));
                    });
                    dragulaService.removeModel.subscribe(function (value) {
                        _this.onRemoveModel(value.slice(1));
                    });
                }
                AdminComponent.prototype.onDropModel = function (args) {
                    var el = args[0], target = args[1], source = args[2];
                };
                AdminComponent.prototype.onRemoveModel = function (args) {
                    var el = args[0], source = args[1];
                };
                AdminComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.adminService
                        .getHolidays()
                        .subscribe(function (data) {
                        _this.holidayList = data;
                    });
                    this.adminService
                        .getCellTimetable()
                        .flatMap(function (cells) {
                        _this.cellWithTime = [];
                        _this.cellTimetable = [];
                        cells.forEach(function (cell) {
                            if (cell.time.length > 0) {
                                _this.cellWithTime.push(cell);
                            }
                            else {
                                _this.cellTimetable.push(cell);
                            }
                        });
                        return _this.adminService.getTimeLesson();
                    })
                        .subscribe(function (data) {
                        _this.data = data[0];
                        _this.dateList = [];
                        var _loop_1 = function (i) {
                            var beginDay = moment_1.default(data[0].beginDate).day();
                            var date = moment_1.default(data[0].beginDate).day(beginDay + i);
                            var cont = _this.holidayList[0].date.find(function (elem) { return date.isSame(moment_1.default(elem)); });
                            if (cont) {
                                _this.dateList.push({ day: date.toDate(), isHoliday: true });
                            }
                            else {
                                _this.dateList.push({ day: date.toDate(), isHoliday: false });
                            }
                        };
                        for (var i = 0; i < 7; i++) {
                            _loop_1(i);
                        }
                        _this.outTable(data[0], _this.cellWithTime);
                    });
                };
                AdminComponent.prototype.outTable = function (data, validate) {
                    this.timeList = [];
                    var _loop_2 = function (i) {
                        var countSlots = [];
                        for (var a = 0; a < 7; a++) {
                            countSlots.push([]);
                        }
                        data.lessons[i].slots = countSlots;
                        var _loop_3 = function (j) {
                            var begin = moment_1.default(this_1.dateList[j].day).second(data.lessons[i].begin).valueOf();
                            var end = moment_1.default(this_1.dateList[j].day).second(data.lessons[i].end).valueOf();
                            validate.forEach(function (cell) {
                                cell.time.forEach(function (time) {
                                    if (moment_1.default(time.begin).valueOf() === moment_1.default(begin).valueOf()) {
                                        data.lessons[i].slots[j].push(cell);
                                    }
                                });
                            });
                        };
                        for (var j = 0; j < data.lessons[i].slots.length; j++) {
                            _loop_3(j);
                        }
                        this_1.timeList.push(data.lessons[i]);
                    };
                    var this_1 = this;
                    for (var i = 0; i < data.lessons.length; i++) {
                        _loop_2(i);
                    }
                };
                AdminComponent.prototype.onChanged = function (filter) {
                    if (filter.dateList.length > 0) {
                        this.dateList = filter.dateList;
                    }
                    this.outTable(this.data, filter.cells);
                };
                AdminComponent.prototype.onChangedSaveCell = function (bool) {
                    if (bool) {
                        this.showSaveModal = true;
                    }
                };
                AdminComponent.prototype.dataCreateModal = function (cell, dayIndex, begin, end, createModal) {
                    this.cellForSave = cell;
                    this.dataForModalWindow = { dayIndex: dayIndex, begin: begin, end: end };
                    if (this.showSaveModal) {
                        createModal.show({ blurring: false, closable: false });
                        this.showSaveModal = false;
                    }
                };
                AdminComponent.prototype.addCell = function () {
                    this.adminService
                        .addCell()
                        .subscribe();
                };
                AdminComponent.prototype.addLesson = function (lesson) {
                    lesson.begin = this.toInt(lesson.begin);
                    lesson.end = this.toInt(lesson.end);
                    this.adminService
                        .addTimeLesson(lesson)
                        .subscribe();
                };
                AdminComponent.prototype.toInt = function (time) {
                    var arr = time.split(':');
                    return +arr[1] + (+arr[0] * 60);
                };
                AdminComponent.prototype.deleteTimeLesson = function (lessonRow) {
                    var resSend = [];
                    for (var i = 0; i < lessonRow.slots.length; i++) {
                        if (lessonRow.slots[i].length > 0) {
                            lessonRow.slots[i].forEach(function (cell) {
                                resSend.push(cell._id);
                            });
                        }
                    }
                    lessonRow = [lessonRow._id, resSend];
                    this.adminService
                        .deleteLesson(lessonRow)
                        .subscribe();
                };
                AdminComponent.prototype.addDate = function (newDate) {
                    this.adminService
                        .addDate(newDate)
                        .subscribe();
                };
                AdminComponent.prototype.saveCell = function (value, dataForModal, createModal) {
                    this.showSaveButton = true;
                    if (value === 'week') {
                        this.saveOneWeek(this.cellForSave, dataForModal.dayIndex, dataForModal.begin, dataForModal.end);
                    }
                    if (value === 'everyWeek') {
                        this.saveToEnd(this.cellForSave, dataForModal.dayIndex, dataForModal.begin, dataForModal.end);
                    }
                    if (value === 'cherezWeek') {
                    }
                };
                AdminComponent.prototype.saveOneWeek = function (cell, dayIndex, timeListBegin, timeListEnd) {
                    var result = {};
                    var begin = moment_1.default(this.dateList[dayIndex].day).second(timeListBegin);
                    var end = moment_1.default(this.dateList[dayIndex].day).second(timeListEnd);
                    if (this.contains(cell.time, begin.toISOString()) === undefined) {
                        cell.time = { begin: begin.toDate(), end: end.toDate() };
                        result = { id: cell._id, time: cell.time };
                    }
                    if (result != {}) {
                        this.adminService
                            .saveOneWeek(result)
                            .subscribe();
                    }
                };
                AdminComponent.prototype.saveToEnd = function (cell, dayIndex, timeListBegin, timeListEnd) {
                    var result = {};
                    var arrTime = [];
                    var firstDayWeek = moment_1.default(this.dateList[0].day).utc();
                    var lastDate = moment_1.default(this.data.endDate).utc();
                    var diff = Math.ceil(lastDate.diff(firstDayWeek, 'days') / 7);
                    var begin = moment_1.default(this.dateList[dayIndex].day).second(timeListBegin);
                    var end = moment_1.default(this.dateList[dayIndex].day).second(timeListEnd);
                    for (var e = 0; e < diff; e++) {
                        begin = moment_1.default(this.dateList[dayIndex].day).add(e * 7, 'day').second(timeListBegin);
                        end = moment_1.default(this.dateList[dayIndex].day).add(e * 7, 'day').second(timeListEnd);
                        if (this.contains(cell.time, begin.toISOString()) === undefined) {
                            arrTime.push({ begin: begin.toDate(), end: end.toDate() });
                        }
                    }
                    result = { id: cell._id, time: arrTime };
                    if (arrTime.length > 0) {
                        this.adminService
                            .saveToEnd(result)
                            .subscribe();
                    }
                };
                AdminComponent.prototype.contains = function (arr, elem) {
                    if (arr.length > 0) {
                        return arr.find(function (i) { return i.begin === elem; });
                    }
                    return undefined;
                };
                return AdminComponent;
            }());
            AdminComponent = __decorate([
                core_1.Component({
                    selector: 'tt-admin',
                    templateUrl: 'client/modules/admin/admin.component.html',
                    styleUrls: ['client/modules/admin/admin.component.css'],
                    providers: [admin_service_1.AdminService, api_service_1.ApiService],
                    viewProviders: [ng2_dragula_1.DragulaService],
                }),
                __metadata("design:paramtypes", [admin_service_1.AdminService, api_service_1.ApiService, ng2_dragula_1.DragulaService])
            ], AdminComponent);
            exports_1("AdminComponent", AdminComponent);
        }
    };
});
//# sourceMappingURL=admin.component.js.map