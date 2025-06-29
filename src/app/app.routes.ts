import { Routes } from '@angular/router';
import { Dashboard } from './views/dashboard/dashboard';
import { Items } from './views/items/items';
import { Reports } from './views/reports/reports';
import { Billing } from './views/billing/billing';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'items', component: Items },
    { path: 'reports', component: Reports }
    { path: 'bill', component: Billing } // Assuming Billing component is imported from the correct path
];
