import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from "./components/index";

export const routes: Routes = [{
    path: '',
    redirectTo: 'main',
    pathMatch:'full'
}, {
    path: '**',
    component: NotFoundComponent
}];

export const routing = RouterModule.forRoot(routes, { useHash: true });
