import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SubjectListComponent } from './list/list.component';
import { SubjectItemComponent } from './item/item.component';

import { routing } from './subject.routing';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        NgSemanticModule,
        FormsModule
    ],
    declarations: [
        SubjectListComponent,
        SubjectItemComponent
    ],
    bootstrap: [
        SubjectListComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SubjectModule { }