import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TransactionFormComponent} from './transaction-form/transaction-form.component';
import {TransactionListComponent} from './transaction-list/transaction-list.component';


const routes: Routes = [
  {path: '', component: TransactionListComponent},
  {path: 'new', component: TransactionFormComponent, data: {breadcrumb: 'Novo'}},
  {path: ':id/edit', component: TransactionFormComponent, data: {breadcrumb: 'Edicao'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {
}
