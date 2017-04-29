import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAuth } from 'angular2-jwt';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing } from './app-routes';

import { LoginModule } from "./modules/login/login.module";
import { MainModule } from "./modules/main/main.module";
import { ModalService, ApiService, MainService } from "./service/index";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        NgSemanticModule,
        routing,
        FormsModule,
        MainModule,
        LoginModule
    ],
    providers: [
        provideAuth({
            globalHeaders: [{ 'Content-type': 'application/json' }],
            newJwtError: true,
            noTokenScheme: true
        }),
        MainService,
        ApiService,
        ModalService
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class AppModule { }
