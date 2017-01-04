import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";

import { GroupListComponent } from "./list/list.component";
import { GroupItemComponent } from "./item/item.component";

import { routing } from "./group.routing";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        NgSemanticModule,
    ],
    declarations: [
        GroupListComponent,
        GroupItemComponent
    ],
    bootstrap: [
        GroupListComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class GroupModule { }