import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from "./components/index";



const appRoutes: Routes = [{
  path: '',
  redirectTo: 'main',
  pathMatch: 'full'
}, {
  path: '**',
  component: NotFoundComponent
}];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });