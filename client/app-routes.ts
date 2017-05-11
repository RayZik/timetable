import { Routes, RouterModule } from '@angular/router';

import { MainListComponent } from './modules/index';
import { LoginComponent } from "./components/index";
import { AuthGuardService } from "./service/index";

export const routes: Routes = [{
    path: '',
    component: MainListComponent,
    canActivate: [AuthGuardService] 
}, {
    path: 'login',
    component: LoginComponent,
}, {
    path: 'main',
    component: MainListComponent,
    canActivate: [AuthGuardService]
}, {
    path: '**',
    component: MainListComponent,
    canActivate: [AuthGuardService]
}];

export const routing = RouterModule.forRoot(routes, { useHash: true });
