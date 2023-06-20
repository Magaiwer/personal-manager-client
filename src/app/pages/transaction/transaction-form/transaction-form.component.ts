import { Component, Injector, OnInit, AfterViewInit } from '@angular/core';
import {Location} from '@angular/common';
import { Validators, FormControl } from '@angular/forms';

import {BaseResourceFormComponent} from '../../../../shared/components/base-resource-form/base-resource-form.component';
import {Transaction} from '../shared/transaction.model';
import {TransactionService} from '../shared/transaction.service';
import {Category} from '../../category/shared/category.model';
import {Account} from '../../account/shared/account.model';
import {CategoryService} from '../../category/shared/category.service';
import {AccountService} from '../../account/shared/account.service';
import {PageableWrapper} from '../../../../shared/service/pageable-wrapper';

@Component({
  selector: 'ngx-transaction',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent extends BaseResourceFormComponent<Transaction> implements OnInit, AfterViewInit {
  categories: Array<Category>;
  accounts: Array<Account>;
  options = [];
  disableAccount: boolean = false;

  constructor(protected transactionService: TransactionService,
              protected injector: Injector,
              protected location: Location,
              protected categoryService: CategoryService,
              protected accountService: AccountService,
  ) {
    super(injector, transactionService);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadAccounts();
    super.ngOnInit();
    this.options = Transaction.typeOptions();
    BaseResourceFormComponent.resourceLoadedEmitter
      .subscribe(value => {
        console.info('on init category', value);
      });
  }

  backClicked() {
    this.location.back();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      amount: ['', Validators.required],
      // category: this.categoryFormGroup,
      type: ['EXPENSE', Validators.required],
      date: [new Date(), Validators.required],
      categoryId: [null, [Validators.required]],
      accountId: [null, [Validators.required]],
    });
  }

  protected reset(): void {
     this.resourceForm.reset({
      name: null,
      description: null,
      amount: 0,
      date: new Date(),
      accountId: this.accountIdControl.value,
      category: [],
    });
    this.resetFocus();
  }

  private loadCategories() {
    this.categoryService.findAll('/all').subscribe(
      (categories: Category[]) => this.categories = categories,
    );
  }

  private loadAccounts() {
    this.accountService.findAll().subscribe(
      (accounts: PageableWrapper) => {
        this.accounts = accounts.content;
        if (this.accounts.length === 1 && !this.accountIdControl.value ) {
          this.accountIdControl.setValue(this.accounts[0]?.id);
          this.disableAccount = true;
        }
      });
  }



  ngAfterViewInit() {
    this.resetFocus();
  }

  private resetFocus() {
    this.setFocus('name');
  }

/*   get categoryFormGroup() {
    console.info('form group category', this.category);
    return this.formBuilder.group({
      id: [this.category?.id, Validators.required],
    });
  } */
  get accountIdControl() {
    return this.resourceForm.get('accountId');
  }
  protected creationPageTitle(): string {
    return 'Cadastro de Novo Lançamento';
  }

  protected editionPageTitle(): string {
    const resourceName = this.resource.name || '';
    return 'Editando Lançamento: ' + resourceName;
  }


}
