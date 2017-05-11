import { Routes, RouterModule } from '@angular/router';

import { MainListComponent } from './list/main-list.component';
import { MainItemComponent } from './item/main-item.component';
import { AuthGuardService } from "../../service/index";

export const routes: Routes = [
    {
        path: 'main/:id', component: MainItemComponent,
        canActivate: [AuthGuardService]
    }
];

export const routing = RouterModule.forChild(routes);