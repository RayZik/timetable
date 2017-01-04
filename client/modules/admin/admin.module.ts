import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';

import { AdminComponent } from "./admin.component";

import { TeacherModule } from "../teacher/teacher.module";
import { SubjectModule } from "../subject/subject.module";
import { OfficeModule } from "../office/office.module";
import { GroupModule } from "../group/group.module";

import { routing } from "./admin.routing";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        NgSemanticModule,
        routing,
        TeacherModule,
        SubjectModule,
        OfficeModule,
        GroupModule
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