import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../client/components/passport/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
