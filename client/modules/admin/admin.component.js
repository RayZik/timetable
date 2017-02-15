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
                function AdminComponent(adminService, dragulaService) {
                    var _this = this;
                    this.adminService = adminService;
                    this.dragulaService = dragulaService;
                    this.cellTimetable = [];
                    this.dateList = [];
                    this.timeList = [];
                    this.lesson = {};
                    this.newDate = {};
                    this.validedTimeCell = [];
                    this.arrayWeeks = [];
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
                        .getCellTimetable()
                        .flatMap(function (cells) {
                        _this.validedTimeCell = [];
                        _this.cellTimetable = [];
                        cells.forEach(function (cell) {
                            if (cell.time.length > 0) {
                                _this.validedTimeCell.push(cell);
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
                        for (var i = 0; i < 7; i++) {
                            var beginDay = moment_1.default(data[0].beginDate).day();
                            _this.dateList.push(moment_1.default(data[0].beginDate).day(beginDay + i).toDate());
                        }
                        _this.outTable(data[0]);
                    });
                };
                AdminComponent.prototype.outTable = function (data) {
                    this.timeList = [];
                    var _loop_1 = function (i) {
                        data.lessons[i].slots = [[], [], [], [], [], [], []];
                        var _loop_2 = function (j) {
                            var begin = moment_1.default(this_1.dateList[j]).second(data.lessons[i].begin).valueOf();
                            var end = moment_1.default(this_1.dateList[j]).second(data.lessons[i].end).valueOf();
                            this_1.validedTimeCell.forEach(function (cell) {
                                cell.time.forEach(function (time) {
                                    if (moment_1.default(time.begin).valueOf() === moment_1.default(begin).valueOf()) {
                                        data.lessons[i].slots[j].push(cell);
                                    }
                                });
                            });
                        };
                        for (var j = 0; j < data.lessons[i].slots.length; j++) {
                            _loop_2(j);
                        }
                        this_1.timeList.push(data.lessons[i]);
                    };
                    var this_1 = this;
                    for (var i = 0; i < data.lessons.length; i++) {
                        _loop_1(i);
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
                AdminComponent.prototype.saveOneWeek = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data[i].slots.length; j++) {
                            for (var t = 0; t < data[i].slots[j].length; t++) {
                                if (data[i].slots[j][t]) {
                                    var begin = moment_1.default(this.dateList[j]).second(data[i].begin).utc().toDate();
                                    var end = moment_1.default(this.dateList[j]).second(data[i].end).utc().toDate();
                                    data[i].slots[j][t].time = { begin: begin, end: end };
                                    res.push([data[i].slots[j][t]._id, data[i].slots[j][t].time]);
                                }
                            }
                        }
                    }
                    this.adminService
                        .saveOneWeek(res)
                        .subscribe();
                };
                AdminComponent.prototype.saveToEnd = function (data) {
                    var res = [];
                    var firstDayWeek = moment_1.default(this.dateList[0]);
                    var endDate = moment_1.default(this.data.endDate);
                    var diff = Math.ceil(endDate.diff(firstDayWeek, 'days') / 7);
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data[i].slots.length; j++) {
                            for (var t = 0; t < data[i].slots[j].length; t++) {
                                if (data[i].slots[j][t]) {
                                    var begin = moment_1.default(this.dateList[j]).second(data[i].begin).utc();
                                    var end = moment_1.default(this.dateList[j]).second(data[i].end).utc();
                                    data[i].slots[j][t].time = [];
                                    for (var e = 0; e < diff; e++) {
                                        data[i].slots[j][t].time.push({ begin: begin.add(e * 7, 'day').toDate(), end: end.add(e * 7, 'day').toDate() });
                                        begin = moment_1.default(this.dateList[j]).second(data[i].begin).utc();
                                        end = moment_1.default(this.dateList[j]).second(data[i].end).utc();
                                    }
                                    res.push([data[i].slots[j][t]._id, data[i].slots[j][t].time]);
                                }
                            }
                        }
                    }
                    this.adminService
                        .saveToEnd(res)
                        .subscribe();
                };
                AdminComponent.prototype.prevWeek = function () {
                    var n = this.dateList;
                    this.dateList = [];
                    for (var i = 7; i >= 1; i--) {
                        this.dateList.push(moment_1.default(n[0]).add(-i, 'day').toDate());
                    }
                    this.outTable(this.data);
                };
                AdminComponent.prototype.nextWeek = function () {
                    var n = this.dateList;
                    var len = n.length - 1;
                    this.dateList = [];
                    for (var i = 1; i <= 7; i++) {
                        this.dateList.push(moment_1.default(n[len]).add(i, 'day').toDate());
                    }
                    this.outTable(this.data);
                };
                return AdminComponent;
            }());
            AdminComponent = __decorate([
                core_1.Component({
                    selector: 'tt-admin',
                    templateUrl: "client/modules/admin/admin.component.html",
                    providers: [admin_service_1.AdminService, api_service_1.ApiService],
                    viewProviders: [ng2_dragula_1.DragulaService]
                }),
                __metadata("design:paramtypes", [admin_service_1.AdminService, ng2_dragula_1.DragulaService])
            ], AdminComponent);
            exports_1("AdminComponent", AdminComponent);
        }
    };
});
//# sourceMappingURL=admin.component.js.map