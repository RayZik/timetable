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
                // @Input() teachers:any[];
                function AdminComponent(adminService, apiService) {
                    this.adminService = adminService;
                    this.apiService = apiService;
                    this.counter = 0;
                    this.timetable = [];
                }
                AdminComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.refresh();
                    this.apiService
                        .getTeachers()
                        .subscribe(function (data) { _this.teachers = data; }, function (err) { return console.log(err); });
                };
                AdminComponent.prototype.addTT = function (id) {
                    this.adminService
                        .addTT(id)
                        .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); });
                };
                AdminComponent.prototype.refresh = function () {
                    var _this = this;
                    this.adminService
                        .getTimetable()
                        .subscribe(function (data) { _this.timetable.push(data); }, function (err) { return console.log(err); });
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