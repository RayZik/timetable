System.register(["@angular/core", "@angular/http", "angular2-jwt", "rxjs/add/operator/map", "rxjs/add/observable/of", "rxjs/add/operator/share", "rxjs/Observable"], function (exports_1, context_1) {
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
    var core_1, http_1, angular2_jwt_1, Observable_1, ApiService;
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
            },
            function (_2) {
            },
            function (_3) {
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }
        ],
        execute: function () {
            ApiService = (function () {
                function ApiService(authHttp, http) {
                    this.authHttp = authHttp;
                    this.http = http;
                    this.cache = {};
                }
                ApiService.prototype.getUsers = function () {
                    var _this = this;
                    if (this.cache['users']) {
                        return Observable_1.Observable.of(this.cache['users']);
                    }
                    else {
                        return this
                            .http
                            .get('/api/home')
                            .map(function (response) {
                            _this.cache['users'] = response.json();
                            return _this.cache['users'];
                        })
                            .share();
                    }
                };
                //subject
                ApiService.prototype.getSubjects = function () {
                    var _this = this;
                    if (this.cache['subjects']) {
                        return Observable_1.Observable.of(this.cache['subjects']);
                    }
                    else {
                        return this
                            .http
                            .get('/api/admin/subject')
                            .map(function (response) {
                            _this.cache['subjects'] = response.json();
                            return _this.cache['subjects'];
                        })
                            .share();
                    }
                };
                ApiService.prototype.getSubject = function (id) {
                    var _this = this;
                    if (this.cache['subject']) {
                        return Observable_1.Observable.of(this.cache['subject']);
                    }
                    else {
                        return this
                            .http
                            .get("/api/admin/subject/" + id)
                            .map(function (response) {
                            _this.cache['subject'] = response.json();
                            return _this.cache['subject'];
                        })
                            .share();
                    }
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
                    var _this = this;
                    if (this.cache['teachers']) {
                        return Observable_1.Observable.of(this.cache['teachers']);
                    }
                    else {
                        return this
                            .http
                            .get('/api/admin/teacher')
                            .map(function (response) {
                            _this.cache['teachers'] = response.json();
                            return _this.cache['teachers'];
                        })
                            .share();
                    }
                };
                ApiService.prototype.getTeacher = function (id) {
                    var _this = this;
                    if (this.cache['teacher']) {
                        return Observable_1.Observable.of(this.cache['teacher']);
                    }
                    else {
                        return this
                            .http
                            .get("/api/admin/teacher/" + id)
                            .map(function (response) {
                            _this.cache['teacher'] = response.json();
                            return _this.cache['teacher'];
                        })
                            .share();
                    }
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
                    var _this = this;
                    if (this.cache['offices']) {
                        return Observable_1.Observable.of(this.cache['offices']);
                    }
                    else {
                        return this
                            .http
                            .get('/api/admin/office')
                            .map(function (response) {
                            _this.cache['offices'] = response.json();
                            return _this.cache['offices'];
                        })
                            .share();
                    }
                };
                ApiService.prototype.getOffice = function (id) {
                    var _this = this;
                    if (this.cache['office']) {
                        return Observable_1.Observable.of(this.cache['office']);
                    }
                    else {
                        return this
                            .http
                            .get("/api/admin/office/" + id)
                            .map(function (response) {
                            _this.cache['office'] = response.json();
                            return _this.cache['office'];
                        })
                            .share();
                    }
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
                    var _this = this;
                    if (this.cache['groups']) {
                        return Observable_1.Observable.of(this.cache['groups']);
                    }
                    else {
                        return this
                            .http
                            .get('/api/admin/group')
                            .map(function (response) {
                            _this.cache['groups'] = response.json();
                            return _this.cache['groups'];
                        })
                            .share();
                    }
                };
                ApiService.prototype.getGroup = function (id) {
                    var _this = this;
                    if (this.cache['group']) {
                        return Observable_1.Observable.of(this.cache['group']);
                    }
                    else {
                        return this
                            .http
                            .get("/api/admin/group/" + id)
                            .map(function (response) {
                            _this.cache['group'] = response.json();
                            return _this.cache['group'];
                        })
                            .share();
                    }
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