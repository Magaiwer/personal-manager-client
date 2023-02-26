import { AfterViewInit, Component, Inject, Injectable, OnInit, Injector } from '@angular/core';

import {BaseResourceListComponent} from '../../../../shared/components/base-resource-list/base-resource-list.component';
import {Transaction} from '../shared/transaction.model';
import {TransactionService} from '../shared/transaction.service';
import {NbDateService} from '@nebular/theme';
import {CategoryService} from '../../category/shared/category.service';

@Component({
  selector: 'ngx-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
@Injectable()
export class TransactionListComponent extends BaseResourceListComponent<Transaction> implements OnInit, AfterViewInit {

  constructor(protected transactionService: TransactionService,
              protected dateService: NbDateService<Date>,
              protected categoryService: CategoryService,
              protected injector: Injector
  ) {
    super(transactionService, injector);
    this.displayedColumns = ['date','name', 'category', 'amount', 'actions'];
  }

  ngOnInit() {
    super.ngOnInit();
  }


  getBalance() {
    return this.getTotalIncome() - this.getTotalExpense();
  }

  getTotalExpense() {
    return this.resources?.filter(t =>
      t.type === Transaction.TYPES.DESPESA)
      .map(t => t.amount)
      .reduce((acc, value) => acc + value, 0);
  }

  getTotalIncome() {
    return this.resources?.filter(t =>
      t.type === Transaction.TYPES.RECEITA)
      .map(t => t.amount)
      .reduce((acc, value) => acc + value, 0);
  }

  getClassType(resource: Transaction): boolean {
    return resource.type === Transaction.TYPES.DESPESA;
  }



}

