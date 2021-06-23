import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../app/pages/category/shared/category.service';
import {PageableWrapper} from '../../service/pageable-wrapper';
import {Category} from '../../../app/pages/category/shared/category.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  public categories: Array<Category>;
  filtersForm: FormGroup;
  protected formBuilder: FormBuilder;

  constructor(protected categoryService: CategoryService,
              formBuilder: FormBuilder,
  ) {
    this.formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.buildResourceForm();
  }

  private loadCategories() {
    this.categoryService.findAll().subscribe(
      (categories: PageableWrapper) => this.categories = categories.content,
    );
  }

  protected buildResourceForm(): void {
    this.filtersForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      amount: ['', Validators.required],
      categoryId: ['', Validators.required],
      transactionType: ['EXPENSE', Validators.required],
      date: [new Date(), Validators.required],
    });
  }


}
