import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAuth } from 'angular2-jwt';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing } from './app-routes';

import { MainModule } from "./modules/main/main.module";
import { LoginComponent } from "./components/index";
import { AuthService, AuthGuardService } from "./service/index";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgSemanticModule,
        routing,
        MainModule
    ],
    providers: [
        provideAuth({
            globalHeaders: [{ 'Content-type': 'application/json' }],
            newJwtError: true,
            noTokenScheme: true
        }),
        AuthService,
        AuthGuardService,
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class AppModule { }

