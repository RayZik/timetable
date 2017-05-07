import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './modules/index';
import { LoginComponent } from "./components/index";
import { AuthGuardService } from "./service/index";

export const routes: Routes = [{
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService]
}, {
    path: 'login',
    component: LoginComponent,
}, {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuardService]
}, {
    path: '**',
    component: MainComponent,
    canActivate: [AuthGuardService]
}];

export const routing = RouterModule.forRoot(routes, { useHash: true });
