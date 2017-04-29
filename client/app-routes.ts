import { Routes, RouterModule } from '@angular/router';

// import { LoginComponent } from './modules';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
