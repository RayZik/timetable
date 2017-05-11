import { Routes, RouterModule } from '@angular/router';

import { GroupListComponent } from './list/list.component';
import { GroupItemComponent } from './item/item.component';
import { AuthGuardService } from "../../service/index";

export const routes: Routes = [
    {
        path: 'group', component: GroupListComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'group/:id', component: GroupItemComponent,
        canActivate: [AuthGuardService]
    }
];

export const routing = RouterModule.forChild(routes);