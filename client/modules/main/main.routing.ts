import { Routes, RouterModule } from '@angular/router';

import { MainListComponent } from './list/main-list.component';
import { MainItemComponent } from './item/main-item.component';

export const routes: Routes = [
    { path: 'main/:id', component: MainItemComponent }
];

export const routing = RouterModule.forChild(routes);