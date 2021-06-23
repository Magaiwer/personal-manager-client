import {Component, Injector, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Validators} from '@angular/forms';

import {BaseResourceFormComponent} from '../../../../shared/components/base-resource-form/base-resource-form.component';
import {Transaction} from '../shared/transaction.model';
import {TransactionService} from '../shared/transaction.service';
import {Category} from '../../category/shared/category.model';
import {CategoryService} from '../../category/shared/category.service';
import {PageableWrapper} from '../../../../shared/service/pageable-wrapper';

@Component({
  selector: 'ngx-transaction',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent extends BaseResourceFormComponent<Transaction> implements OnInit {
  categories: Array<Category>;
  options = [];
  public category: Category;

  constructor(protected transactionService: TransactionService,
              protected injector: Injector,
              protected location: Location,
              protected categoryService: CategoryService,
  ) {
    super(injector, transactionService);
  }

  ngOnInit(): void {
    this.loadCategories();
    super.ngOnInit();
    this.options = this.typeOptions;
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
    });
  }

  protected reset(): void {
    this.resourceForm.reset({
      name: null,
      description: null,
      category: [],
    });
  }

  private loadCategories() {
    this.categoryService.findAll().subscribe(
      (categories: PageableWrapper) => this.categories = categories.content,
    );
  }

  get typeOptions(): Array<any> {
    return Object.entries(Transaction.TYPES).map(
      ([label, value]) => {
        return {
          label: label,
          value: value,
        };
      },
    );
  }

  get categoryFormGroup() {
    console.info('form group category', this.category);
    return this.formBuilder.group({
      id: [this.category?.id, Validators.required],
    });
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Novo Lançamento';
  }

  protected editionPageTitle(): string {
    const resourceName = this.resource.name || '';
    return 'Editando Lançamento: ' + resourceName;
  }


}
