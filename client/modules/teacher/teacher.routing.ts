import { Routes, RouterModule } from '@angular/router';

import { TeacherListComponent } from './list/list.component';
import { TeacherItemComponent } from './item/item.component';
import { AuthGuardService } from "../../service/index";

export const routes: Routes = [
    {
        path: 'teacher', component: TeacherListComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'teacher/:id', component: TeacherItemComponent,
        canActivate: [AuthGuardService]
    }
];

export const routing = RouterModule.forChild(routes);