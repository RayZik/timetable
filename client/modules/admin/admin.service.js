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
                AdminService.prototype.getTimetable = function () {
                    return this
                        .http
                        .get('/api/admin')
                        .map(function (response) { return response.json(); });
                };
                AdminService.prototype.addTeacher = function (id, timetableLineId) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/add_teacher", { id: id, timetableLineId: timetableLineId }, { headers: headers });
                };
                AdminService.prototype.deleteTeacher = function (id, idTimetable) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/delete_teacher/" + id, { idTimetable: idTimetable }, { headers: headers });
                };
                AdminService.prototype.addOffice = function (id, timetableLineId) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/add_office", { id: id, timetableLineId: timetableLineId }, { headers: headers });
                };
                AdminService.prototype.deleteOffice = function (id, idTimetable) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/delete_office/" + id, { idTimetable: idTimetable }, { headers: headers });
                };
                AdminService.prototype.addGroup = function (id, timetableLineId) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/add_group", { id: id, timetableLineId: timetableLineId }, { headers: headers });
                };
                AdminService.prototype.deleteGroup = function (id, idTimetable) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/delete_group/" + id, { idTimetable: idTimetable }, { headers: headers });
                };
                AdminService.prototype.addSubject = function (id, timetableLineId) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/add_subject", { id: id, timetableLineId: timetableLineId }, { headers: headers });
                };
                AdminService.prototype.deleteSubject = function (id, idTimetable) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/delete_subject/" + id, { idTimetable: idTimetable }, { headers: headers });
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