import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from '../auth/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'category',
      canActivate: [AuthGuard],
      loadChildren: () => import('../pages/category/category.module')
        .then(m => m.CategoryModule),
    },
    {
      path: 'transaction',
      canActivate: [AuthGuard],
      loadChildren: () => import('../pages/transaction/transaction.module')
        .then(m => m.TransactionModule),
    },
    {
      path: 'account',
      canActivate: [AuthGuard],
      loadChildren: () => import('../pages/account/account.module')
        .then(m => m.AccountModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
