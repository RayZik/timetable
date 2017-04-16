import { Routes, RouterModule } from '@angular/router';

import { GroupListComponent } from './list/list.component';
import { GroupItemComponent } from './item/item.component';

export const routes: Routes = [
    { path: 'group', component: GroupListComponent, pathMatch: 'full' },
    { path: 'group/:id', component: GroupItemComponent }
];

export const routing = RouterModule.forChild(routes);