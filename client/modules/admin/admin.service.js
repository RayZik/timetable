System.register(["@angular/core", "@angular/http", "rxjs/add/operator/map"], function (exports_1, context_1) {
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
    var core_1, http_1, AdminService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            AdminService = (function () {
                function AdminService(http) {
                    this.http = http;
                }
                //ceel-timetable
                AdminService.prototype.getCellTimetable = function () {
                    return this
                        .http
                        .get('/api/admin/cellTimetable')
                        .map(function (response) { return response.json(); });
                };
                AdminService.prototype.addTeacher = function (id, cellTimetableId) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/cellTimetable/add_teacher", { id: id, cellTimetableId: cellTimetableId }, { headers: headers });
                };
                AdminService.prototype.deleteTeacher = function (id, cellTimetableId) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/cellTimetable/delete_teacher/" + id, { cellTimetableId: cellTimetableId }, { headers: headers });
                };
                AdminService.prototype.addOffice = function (id, cellTimetableId) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/cellTimetable/add_office", { id: id, cellTimetableId: cellTimetableId }, { headers: headers });
                };
                AdminService.prototype.deleteOffice = function (id, cellTimetableId) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/cellTimetable/delete_office/" + id, { cellTimetableId: cellTimetableId }, { headers: headers });
                };
                AdminService.prototype.addGroup = function (id, cellTimetableId) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/cellTimetable/add_group", { id: id, cellTimetableId: cellTimetableId }, { headers: headers });
                };
                AdminService.prototype.deleteGroup = function (id, cellTimetableId) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/cellTimetable/delete_group/" + id, { cellTimetableId: cellTimetableId }, { headers: headers });
                };
                AdminService.prototype.addSubject = function (id, cellTimetableId) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/cellTimetable/add_subject", { id: id, cellTimetableId: cellTimetableId }, { headers: headers });
                };
                AdminService.prototype.deleteSubject = function (id, cellTimetableId) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/cellTimetable/delete_subject/" + id, { cellTimetableId: cellTimetableId }, { headers: headers });
                };
                AdminService.prototype.addCell = function () {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/cellTimetable/add_cell", { headers: headers });
                };
                AdminService.prototype.deleteCell = function (id) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .delete("/api/admin/cellTimetable/delete_cell/" + id, { headers: headers });
                };
                //timetable
                AdminService.prototype.addTimeLesson = function (lesson) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/timetable/add_time_lesson", lesson, { headers: headers });
                };
                AdminService.prototype.addDate = function (newDate) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/timetable/add_date", newDate, { headers: headers });
                };
                AdminService.prototype.getTimeLesson = function () {
                    return this
                        .http
                        .get('/api/admin/timetable')
                        .map(function (response) { return response.json(); });
                };
                AdminService.prototype.saveOneWeek = function (data) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .put("/api/admin/timetable/save_one", data, { headers: headers });
                };
                AdminService.prototype.saveToEnd = function (data) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .put("/api/admin/timetable/save_to_end", { data: data }, { headers: headers });
                };
                AdminService.prototype.deleteLesson = function (lesson) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/timetable/delete_time_lesson", { lesson: lesson }, { headers: headers });
                };
                AdminService.prototype.getHolidays = function () {
                    return this
                        .http
                        .get('/api/admin/timetable/holidays')
                        .map(function (response) { return response.json(); });
                };
                return AdminService;
            }());
            AdminService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], AdminService);
            exports_1("AdminService", AdminService);
        }
    };
});
//# sourceMappingURL=admin.service.js.map