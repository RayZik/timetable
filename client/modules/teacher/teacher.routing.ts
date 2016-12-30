import { Routes, RouterModule } from '@angular/router';

import { TeacherListComponent } from "./list/list.component";
import { TeacherItemComponent } from "./item/item.component";

export const routes: Routes = [
    { path: 'teacher', component: TeacherListComponent, pathMatch: "full" },
    { path: 'teacher/:id', component: TeacherItemComponent }
];

export const routing = RouterModule.forChild(routes);