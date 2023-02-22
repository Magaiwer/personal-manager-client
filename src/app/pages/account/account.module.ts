import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountFormComponent} from './account-form/account-form.component';
import {AccountListComponent} from './account-list/account-list.component';
import {AccountRoutingModule} from './account-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AccountFormComponent,
    AccountListComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    SharedModule,
  ]
})
export class AccountModule {
}
