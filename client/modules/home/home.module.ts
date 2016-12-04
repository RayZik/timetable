import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";

import { LoginComponent } from "../../../client/components/passport/login.component";
import { HomeComponent } from "./home.component";
import { routing } from "./home.routing";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        NgSemanticModule
    ],
    declarations: [
        HomeComponent,
        LoginComponent
    ],
    bootstrap: [
        HomeComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class HomeModule { }