import { Routes } from '@angular/router';
import { Dashboard } from './views/dashboard/dashboard';
import { Items } from './views/items/items';
import { Reports } from './views/reports/reports';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'items', component: Items },
    { path: 'reports', component: Reports }
];
