import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountListComponent} from './account-list/account-list.component';
import {AccountFormComponent} from './account-form/account-form.component';


const routes: Routes = [
  {path: '', component: AccountListComponent},
  {path: 'new', component: AccountFormComponent, data: {breadcrumb: 'Novo'}},
  {path: ':id/edit', component: AccountFormComponent, data: {breadcrumb: 'Edicao'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {
}
