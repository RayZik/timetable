System.register(['@angular/core', "@angular/http", "ng-semantic", "@angular/common", "./admin.component", "./admin.routing"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, ng_semantic_1, common_1, admin_component_1, admin_routing_1;
    var AdminModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng_semantic_1_1) {
                ng_semantic_1 = ng_semantic_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (admin_component_1_1) {
                admin_component_1 = admin_component_1_1;
            },
            function (admin_routing_1_1) {
                admin_routing_1 = admin_routing_1_1;
            }],
        execute: function() {
            AdminModule = (function () {
                function AdminModule() {
                }
                AdminModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            http_1.HttpModule,
                            admin_routing_1.routing,
                            ng_semantic_1.NgSemanticModule
                        ],
                        declarations: [
                            admin_component_1.AdminComponent
                        ],
                        bootstrap: [
                            admin_component_1.AdminComponent
                        ],
                        schemas: [
                            core_1.CUSTOM_ELEMENTS_SCHEMA
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AdminModule);
                return AdminModule;
            }());
            exports_1("AdminModule", AdminModule);
        }
    }
});
//# sourceMappingURL=admin.module.js.map