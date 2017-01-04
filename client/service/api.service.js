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
                ApiService.prototype.get = function (url) {
                    return this
                        .authHttp
                        .get(url)
                        .map(function (response) { return response.json(); });
                };
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
                        .get('/admin/subject')
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.getSubject = function (id) {
                    return this
                        .http
                        .get("/admin/subject/" + id)
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.updateSubject = function (subject) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/admin/subject/" + subject.id, subject, { headers: headers })
                        .map(function (response) { return response.json(); });
                };
                //teacher
                ApiService.prototype.getTeachers = function () {
                    return this
                        .http
                        .get('/admin/teacher')
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.getTeacher = function (id) {
                    return this
                        .http
                        .get("/admin/teacher/" + id)
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.updateTeacher = function (teacher) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/admin/teacher/" + teacher.id, teacher, { headers: headers })
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.createTeachers = function (teacher) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/admin/teacher", teacher, { headers: headers })
                        .map(function (response) { return response.json(); });
                };
                //office
                ApiService.prototype.getOffices = function () {
                    return this
                        .http
                        .get('/admin/office')
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.getOffice = function (id) {
                    return this
                        .http
                        .get("/admin/office/" + id)
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.updateOffice = function (office) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/admin/office/" + office.id, office, { headers: headers })
                        .map(function (response) { return response.json(); });
                };
                //group
                ApiService.prototype.getGroups = function () {
                    return this
                        .http
                        .get('/admin/group')
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.getGroup = function (id) {
                    return this
                        .http
                        .get("/admin/group/" + id)
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.updateGroup = function (group) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this
                        .http
                        .post("/admin/group/" + group.id, group, { headers: headers })
                        .map(function (response) { return response.json(); });
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