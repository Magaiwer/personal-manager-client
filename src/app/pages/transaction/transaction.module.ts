import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TransactionListComponent} from './transaction-list/transaction-list.component';
import {TransactionFormComponent} from './transaction-form/transaction-form.component';
import {TransactionRoutingModule} from './transaction-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {CurrencyMaskModule} from 'ng2-currency-mask';


export const routes = [
  { path: '', component: TransactionListComponent },
];


@NgModule({
  declarations: [TransactionListComponent, TransactionFormComponent, TransactionListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TransactionRoutingModule,
    SharedModule,
    CurrencyMaskModule,
  ],
})
export class TransactionModule {
}
