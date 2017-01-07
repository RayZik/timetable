System.register(["@angular/core", "@angular/http", "angular2-jwt", "rxjs/add/operator/map"], function (exports_1, context_1) {
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
    var core_1, http_1, angular2_jwt_1, ApiService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            ApiService = (function () {
                function ApiService(authHttp, http) {
                    this.authHttp = authHttp;
                    this.http = http;
                }
                ApiService.prototype.getUsers = function () {
                    return this
                        .http
                        .get('/api/home')
                        .map(function (response) { return response.json(); });
                };
                //subject
                ApiService.prototype.getSubjects = function () {
                    return this
                        .http
                        .get('/api/admin/subject')
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.getSubject = function (id) {
                    return this
                        .http
                        .get("/api/admin/subject/" + id)
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.updateSubject = function (subject) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .put("/api/admin/subject/update/" + subject.id, subject, { headers: headers })
                        .map(function (response) { return response; });
                };
                ApiService.prototype.createSubject = function (subject) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/subject/create", subject, { headers: headers })
                        .map(function (response) { return response; });
                };
                ApiService.prototype.deleteSubject = function (id) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .delete("/api/admin/subject/remove/" + id, { headers: headers })
                        .map(function (response) { return response; });
                };
                //teacher
                ApiService.prototype.getTeachers = function () {
                    return this
                        .http
                        .get('/api/admin/teacher')
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.getTeacher = function (id) {
                    return this
                        .http
                        .get("/api/admin/teacher/" + id)
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.updateTeacher = function (teacher) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .put("/api/admin/teacher/update/" + teacher.id, teacher, { headers: headers })
                        .map(function (response) { return response; });
                };
                ApiService.prototype.createTeacher = function (teacher) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/teacher/create", teacher, { headers: headers })
                        .map(function (response) { return response; });
                };
                ApiService.prototype.deleteTeacher = function (id) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .delete("/api/admin/teacher/remove/" + id, { headers: headers })
                        .map(function (response) { return response; });
                };
                //office
                ApiService.prototype.getOffices = function () {
                    return this
                        .http
                        .get('/api/admin/office')
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.getOffice = function (id) {
                    return this
                        .http
                        .get("/api/admin/office/" + id)
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.updateOffice = function (office) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .put("/api/admin/office/update/" + office.id, office, { headers: headers })
                        .map(function (response) { return response; });
                };
                ApiService.prototype.createOffice = function (office) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/office/create", office, { headers: headers })
                        .map(function (response) { return response; });
                };
                ApiService.prototype.deleteOffice = function (id) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .delete("/api/admin/office/remove/" + id, { headers: headers })
                        .map(function (response) { return response; });
                };
                //group
                ApiService.prototype.getGroups = function () {
                    return this
                        .http
                        .get('/api/admin/group')
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.getGroup = function (id) {
                    return this
                        .http
                        .get("/api/admin/group/" + id)
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.updateGroup = function (group) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .put("/api/admin/group/update/" + group.id, group, { headers: headers })
                        .map(function (response) { return response; });
                };
                ApiService.prototype.createGroup = function (group) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/api/admin/group/create", group, { headers: headers })
                        .map(function (response) { return response; });
                };
                ApiService.prototype.deleteGroup = function (id) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .delete("/api/admin/group/remove/" + id, { headers: headers })
                        .map(function (response) { return response; });
                };
                return ApiService;
            }());
            ApiService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [angular2_jwt_1.AuthHttp, http_1.Http])
            ], ApiService);
            exports_1("ApiService", ApiService);
        }
    };
});
//# sourceMappingURL=api.service.js.map