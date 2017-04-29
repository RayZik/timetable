import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full' }
];

export const routing = RouterModule.forChild(routes);