import { Routes, RouterModule } from '@angular/router';

import { OfficeListComponent } from "./list/list.component";
import { OfficeItemComponent } from "./item/item.component";

export const routes: Routes = [
    { path: 'office', component: OfficeListComponent, pathMatch: "full" },
    { path: 'office/:id', component: OfficeItemComponent }
];

export const routing = RouterModule.forChild(routes);