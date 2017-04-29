import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic';
import { CommonModule } from '@angular/common';

import { LoginComponent } from '../index';
import { AuthComponent } from '../../components/index';
import { routing } from './login.routing';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        NgSemanticModule
    ],
    declarations: [
        LoginComponent,
        AuthComponent
    ],
    bootstrap: [
        LoginComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class LoginModule { }