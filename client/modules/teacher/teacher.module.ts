import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TeacherListComponent } from './list/list.component';
import { TeacherItemComponent } from './item/item.component';

import { routing } from './teacher.routing';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        NgSemanticModule,
        FormsModule
    ],
    declarations: [
        TeacherListComponent,
        TeacherItemComponent
    ],
    bootstrap: [
        TeacherListComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class TeacherModule { }