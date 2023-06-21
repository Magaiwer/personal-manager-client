import { AfterViewInit, Component, Inject, Injectable, OnInit, Injector } from '@angular/core';

import {BaseResourceListComponent} from '../../../../shared/components/base-resource-list/base-resource-list.component';
import {Transaction} from '../shared/transaction.model';
import {TransactionService} from '../shared/transaction.service';
import {NbDateService} from '@nebular/theme';
import {CategoryService} from '../../category/shared/category.service';
import { Category } from '../../category/shared/category.model';
import { AccountService } from '../../account/shared/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account } from '../../account/shared/account.model';
import { PageableWrapper } from '../../../../shared/service/pageable-wrapper';

@Component({
  selector: 'ngx-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
@Injectable()
export class TransactionListComponent extends BaseResourceListComponent<Transaction> implements OnInit, AfterViewInit {

  public categories: Array<Category>;
  public accounts: Array<Account>;
  filtersForm: FormGroup;
  options = [];
  protected formBuilder: FormBuilder;

  constructor(protected transactionService: TransactionService,
              protected dateService: NbDateService<Date>,
              protected categoryService: CategoryService,
              protected accountService: AccountService,
              formBuilder: FormBuilder,
              protected injector: Injector,
  ) {
    super(transactionService, injector);
    this.displayedColumns = ['date','name', 'category', 'amount', 'actions'];
    this.formBuilder = formBuilder;
    this.options = Transaction.typeOptions();
    this.options.push({label: "TODOS", value: null})
    console.log(this.options)
  }

  ngOnInit() {
    this.buildResourceForm();
    this.loadCategories();
    this.loadAccounts();
    this.filterValues = this.filtersForm.value;
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

  /* Filters */
  onSubmit() {
    this.loadTransactions();
  }

  private loadCategories() {
    this.categoryService
      .findAll("/all")
      .subscribe((categories: Category[]) => (this.categories = categories));
  }

  private loadAccounts() {
    this.accountService
      .findAll("/all")
      .subscribe((accounts: Account[]) => (this.accounts = accounts));
  }

  private loadTransactions() {
    const filter = this.filtersForm.value;
    this.dataSource.loadDataSource('', 'asc', 0, 10, true, filter);
  }

  private buildResourceForm(): void {
    this.filtersForm = this.formBuilder.group({
     type: [null],
      monthDate: [new Date()],
      categoriesIds: [],
      accountsIds: [],
    });

  }
}
