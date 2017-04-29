import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

export const routes: Routes = [
    { path: 'main', component: MainComponent, pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(routes, { useHash: true });