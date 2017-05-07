import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { MomentModule } from 'angular2-moment';

import { TeacherModule } from '../teacher/teacher.module';
import { SubjectModule } from '../subject/subject.module';
import { OfficeModule } from '../office/office.module';
import { GroupModule } from '../group/group.module';
import { CellComponent, FilterComponent } from "../../components/index";
import { ModalComponent } from "../../direcrives/index";
import { MainComponentList } from './main.component';

import { ModalService, ApiService, MainService } from "../../service/index";

@NgModule({
    imports: [
        DragulaModule,
        MomentModule,
        FormsModule,
        BrowserModule,
        HttpModule,
        NgSemanticModule,
        TeacherModule,
        SubjectModule,
        OfficeModule,
        GroupModule
    ],
    declarations: [
        MainComponentList,
        CellComponent,
        FilterComponent,
        ModalComponent
    ],
    providers: [
        MainService,
        ApiService,
        ModalService,
    ],
    bootstrap: [
        MainComponentList
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class MainModule { }