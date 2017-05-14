import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAuth } from 'angular2-jwt';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppComponent } from './app.component';
import { routing } from './app-routes';

import { MainModule } from "./modules/main/main.module";
import { SubjectModule } from "./modules/subject/subject.module";
import { TeacherModule } from "./modules/teacher/teacher.module";
import { GroupModule } from "./modules/group/group.module";
import { OfficeModule } from "./modules/office/office.module";
import { LoginModule } from "./modules/login/login.module";

import { AuthService, AuthGuardService, AuthTokenService } from "./service/index";
import { NotFoundComponent } from "./components/index";
import { LoginComponent } from "./modules/login/login.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgSemanticModule,
        routing,
        MainModule,
        TeacherModule,
        SubjectModule,
        OfficeModule,
        GroupModule,
        LoginModule,
        FlashMessagesModule
    ],
    providers: [
        provideAuth({
            globalHeaders: [{ 'Content-type': 'application/json' }],
            newJwtError: true,
            noTokenScheme: true
        }),
        AuthService,
        AuthGuardService,
        AuthTokenService
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        NotFoundComponent
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class AppModule { }

