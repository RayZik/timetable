import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";

import { OfficeListComponent } from "./list/list.component";
import { OfficeItemComponent } from "./item/item.component";

import { routing } from "./office.routing";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        NgSemanticModule,
    ],
    declarations: [
        OfficeListComponent,
        OfficeItemComponent
    ],
    bootstrap: [
        OfficeListComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class OfficeModule { }