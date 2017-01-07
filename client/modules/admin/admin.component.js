System.register(["@angular/core", "./admin.service", "../../service/api.service"], function (exports_1, context_1) {
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
    var core_1, admin_service_1, api_service_1, AdminComponent;
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
            }
        ],
        execute: function () {
            AdminComponent = (function () {
                function AdminComponent(adminService, apiService) {
                    this.adminService = adminService;
                    this.apiService = apiService;
                    this.counter = 0;
                    this.timetable = [];
                    this.idTeacher = { id: "", show: false };
                    this.idSubject = { id: "", show: false };
                    this.idOffice = { id: "", show: false };
                    this.idGroup = { id: "", show: false };
                    this.idTimetable = "";
                }
                AdminComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.refresh();
                    this.apiService
                        .getTeachers()
                        .subscribe(function (data) { _this.teachers = data; }, function (err) { return console.log(err); });
                    this.apiService
                        .getGroups()
                        .subscribe(function (data) { _this.groups = data; }, function (err) { return console.log(err); });
                    this.apiService
                        .getOffices()
                        .subscribe(function (data) { _this.offices = data; }, function (err) { return console.log(err); });
                    this.apiService
                        .getSubjects()
                        .subscribe(function (data) { _this.subjects = data; }, function (err) { return console.log(err); });
                };
                AdminComponent.prototype.addTeacher = function () {
                    this.adminService
                        .addTeacher(this.idTeacher.id, this.idTimetable)
                        .subscribe();
                    this.idTeacher.show = false;
                    this.refresh();
                };
                AdminComponent.prototype.deleteTeacher = function (id, idTimetable) {
                    this.adminService
                        .deleteTeacher(id, idTimetable)
                        .subscribe();
                    this.refresh();
                };
                AdminComponent.prototype.addGroup = function () {
                    this.adminService
                        .addGroup(this.idGroup.id, this.idTimetable)
                        .subscribe();
                    this.idGroup.show = false;
                    this.refresh();
                };
                AdminComponent.prototype.deleteGroup = function (id, idTimetable) {
                    this.adminService
                        .deleteGroup(id, idTimetable)
                        .subscribe();
                    this.refresh();
                };
                AdminComponent.prototype.addOffice = function () {
                    this.adminService
                        .addOffice(this.idOffice.id, this.idTimetable)
                        .subscribe();
                    this.idOffice.show = false;
                    this.refresh();
                };
                AdminComponent.prototype.deleteOffice = function (id, idTimetable) {
                    this.adminService
                        .deleteOffice(id, idTimetable)
                        .subscribe();
                    this.refresh();
                };
                AdminComponent.prototype.addSubject = function () {
                    this.adminService
                        .addSubject(this.idSubject.id, this.idTimetable)
                        .subscribe();
                    this.idSubject.show = false;
                    this.refresh();
                };
                AdminComponent.prototype.deleteSubject = function (id, idTimetable) {
                    this.adminService
                        .deleteSubject(id, idTimetable)
                        .subscribe();
                    this.refresh();
                };
                AdminComponent.prototype.showSelectGroup = function (id) { this.idTimetable = id; this.idGroup.show = !this.idGroup.show; };
                AdminComponent.prototype.showSelectOffice = function (id) { this.idTimetable = id; this.idOffice.show = !this.idOffice.show; };
                AdminComponent.prototype.showSelectSubject = function (id) { this.idTimetable = id; this.idSubject.show = !this.idSubject.show; };
                AdminComponent.prototype.showSelectTeacher = function (id) { this.idTimetable = id; this.idTeacher.show = !this.idTeacher.show; };
                AdminComponent.prototype.setTeacherId = function (id) { this.idTeacher.id = id; };
                AdminComponent.prototype.setGroupId = function (id) { this.idGroup.id = id; };
                AdminComponent.prototype.setSubjectId = function (id) { this.idSubject.id = id; };
                AdminComponent.prototype.setOfficeId = function (id) { this.idOffice.id = id; };
                AdminComponent.prototype.refresh = function () {
                    var _this = this;
                    this.adminService
                        .getTimetable()
                        .subscribe(function (data) { _this.timetable = data; }, function (err) { return console.log(err); });
                };
                return AdminComponent;
            }());
            AdminComponent = __decorate([
                core_1.Component({
                    selector: 'tt-admin',
                    templateUrl: "client/modules/admin/admin.component.html",
                    providers: [admin_service_1.AdminService, api_service_1.ApiService],
                }),
                __metadata("design:paramtypes", [admin_service_1.AdminService, api_service_1.ApiService])
            ], AdminComponent);
            exports_1("AdminComponent", AdminComponent);
        }
    };
});
//# sourceMappingURL=admin.component.js.map