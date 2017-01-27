System.register(["@angular/core", "./admin.service", "../../service/api.service", "ng2-dragula/ng2-dragula"], function (exports_1, context_1) {
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
    var core_1, admin_service_1, api_service_1, ng2_dragula_1, AdminComponent;
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
                        .subscribe(function (cells) { _this.cellTimetable = cells; }, function (err) { return console.log(err); });
                    this.adminService
                        .getTimeLesson()
                        .subscribe(function (data) {
                        _this.timeList = [];
                        _this.topDate = new Date();
                        if (_this.dateList.length == 0) {
                            for (var i_1 = 0; i_1 < 7; i_1++) {
                                _this.topDate = new Date(data[0].beginDate);
                                _this.topDate.setDate(_this.topDate.getDate() + i_1);
                                _this.dateList.push(_this.topDate);
                                console.log(data[0]);
                            }
                        }
                        for (var i = 0; i < data[0].lessons.length; i++) {
                            data[0].lessons[i].slots = [[], [], [], [], [], [], []];
                            _this.timeList.push(data[0].lessons[i]);
                        }
                    }, function (err) { return console.log(err); });
                };
                AdminComponent.prototype.addCell = function () {
                    this.adminService
                        .addCell()
                        .subscribe();
                    this.ngOnInit();
                };
                AdminComponent.prototype.addLesson = function (lesson) {
                    lesson.begin = this.toInt(lesson.begin);
                    lesson.end = this.toInt(lesson.end);
                    this.adminService
                        .addTimeLesson(lesson)
                        .subscribe();
                    this.ngOnInit();
                };
                AdminComponent.prototype.toInt = function (time) {
                    var arr = time.split(':');
                    return +arr[1] + (+arr[0] * 60);
                };
                AdminComponent.prototype.deleteTimeLesson = function (lesson) {
                    this.adminService
                        .deleteLesson(lesson)
                        .subscribe();
                    this.ngOnInit();
                };
                AdminComponent.prototype.addDate = function (newDate) {
                    this.adminService
                        .addDate(newDate)
                        .subscribe();
                };
                AdminComponent.prototype.saveTimetable = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data[i].slots.length; j++) {
                            for (var t = 0; t < data[i].slots[j].length; t++) {
                                if (data[i].slots[j][t]) {
                                    var begin = (new Date(this.dateList[j]).getTime() + data[i].begin * 1000);
                                    var end = new Date(this.dateList[j]).getTime() + data[i].end * 1000;
                                    data[i].slots[j][t].time[0] = { begin: new Date(begin), end: new Date(end) };
                                    res.push([data[i].slots[j][t]._id, data[i].slots[j][t].time[0]]);
                                }
                            }
                        }
                    }
                    console.log(res);
                    this.adminService
                        .saveTimetable(res)
                        .subscribe();
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