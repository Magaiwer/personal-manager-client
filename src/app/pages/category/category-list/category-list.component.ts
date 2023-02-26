import { Component, OnInit, Injector } from '@angular/core';

import {BaseResourceListComponent} from '../../../../shared/components/base-resource-list/base-resource-list.component';
import {Category} from '../shared/category.model';
import {CategoryService} from '../shared/category.service';

@Component({
  selector: 'ngx-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent extends BaseResourceListComponent<Category> implements OnInit {

  constructor(protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(categoryService, injector);
    this.displayedColumns = ['id', 'name', 'description', 'actions'];
  }

}

