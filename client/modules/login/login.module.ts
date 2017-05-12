import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { routing } from './login.routing';

import { AuthService } from "../../service/index";
import { LoginComponent } from "./login.component";

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        HttpModule,
        NgSemanticModule,
        routing
    ],
    declarations: [

    ],
    providers: [
        AuthService
    ],
    bootstrap: [
        LoginComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class LoginModule { }