import { Routes, RouterModule } from '@angular/router';

import { OfficeListComponent } from './list/list.component';
import { OfficeItemComponent } from './item/item.component';
import { AuthGuardService } from "../../service/index";

export const routes: Routes = [
    {
        path: 'office', component: OfficeListComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'office/:id', component: OfficeItemComponent,
        canActivate: [AuthGuardService]
    }
];

export const routing = RouterModule.forChild(routes);