import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './modules/index';
import { LoginComponent } from "./components/index";
import { AuthGuardService } from "./service/index";

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
}, {
    path: 'login',
    component: LoginComponent,
}, {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuardService]
}, {
    path: '**',
    redirectTo: 'login'
}];

export const routing = RouterModule.forRoot(routes, { useHash: true });
