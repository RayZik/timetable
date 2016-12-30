System.register(["@angular/core", "../../service/api.service"], function (exports_1, context_1) {
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
    var core_1, api_service_1, HomeComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            }
        ],
        execute: function () {
            HomeComponent = (function () {
                function HomeComponent(apiService) {
                    this.apiService = apiService;
                }
                HomeComponent.prototype.ngOnInit = function () {
                    this.refresh();
                };
                HomeComponent.prototype.refresh = function () {
                    var _this = this;
                    this.apiService
                        .getUsers()
                        .subscribe(function (data) { _this.usersArray = data; });
                };
                HomeComponent.prototype.login = function (username, password) {
                    if (username == "admin" && password == "admin") {
                        this.isLogged = true;
                    }
                };
                return HomeComponent;
            }());
            HomeComponent = __decorate([
                core_1.Component({
                    selector: "tt-home",
                    templateUrl: "client/modules/home/home.component.html",
                    providers: [api_service_1.ApiService]
                }),
                __metadata("design:paramtypes", [api_service_1.ApiService])
            ], HomeComponent);
            exports_1("HomeComponent", HomeComponent);
        }
    };
});
//# sourceMappingURL=home.component.js.map