import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { SaveCellComponent } from '../../components/cell-timetable/save-cell/save-cell.component';

export const routes: Routes = [
    { path: 'admin', component: AdminComponent, pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(routes, { useHash: true });