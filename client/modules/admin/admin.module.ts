import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";

import { AdminComponent } from "./admin.component";
import { routing } from "./admin.routing";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        NgSemanticModule
    ],
    declarations: [
        AdminComponent
    ],
    bootstrap: [
        AdminComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AdminModule { }