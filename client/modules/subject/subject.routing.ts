import { Routes, RouterModule } from '@angular/router';

import { SubjectListComponent } from "./list/list.component";
import { SubjectItemComponent } from "./item/item.component";

export const routes: Routes = [
    { path: 'subject', component: SubjectListComponent, pathMatch: "full" },
    { path: 'subject/:id', component: SubjectItemComponent }
];

export const routing = RouterModule.forChild(routes);