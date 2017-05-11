import { Routes, RouterModule } from '@angular/router';

import { SubjectListComponent } from './list/list.component';
import { SubjectItemComponent } from './item/item.component';
import { AuthGuardService } from "../../service/index";

export const routes: Routes = [
    {
        path: 'subject', component: SubjectListComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'subject/:id', component: SubjectItemComponent,
        canActivate: [AuthGuardService]
    }
];

export const routing = RouterModule.forChild(routes);