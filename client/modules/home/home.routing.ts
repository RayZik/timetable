import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent , pathMatch: 'full'}
];

export const routing = RouterModule.forChild(routes);