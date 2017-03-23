System.register(["@angular/router", "./admin.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, admin_component_1, routes, routing;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (admin_component_1_1) {
                admin_component_1 = admin_component_1_1;
            }
        ],
        execute: function () {
            exports_1("routes", routes = [
                { path: 'admin', component: admin_component_1.AdminComponent, pathMatch: 'full' },
            ]);
            exports_1("routing", routing = router_1.RouterModule.forRoot(routes, { useHash: true }));
        }
    };
});
//# sourceMappingURL=admin.routing.js.map