import {Component, Inject, Injector, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Validators} from '@angular/forms';

import {BaseResourceFormComponent} from '../../../../shared/components/base-resource-form/base-resource-form.component';
import {Category} from '../shared/category.model';
import {CategoryService} from '../shared/category.service';

@Component({
  selector: 'ngx-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> implements OnInit {

  constructor(protected categoryService: CategoryService,
              protected injector: Injector,
              protected location: Location,
  ) {
    super(injector, categoryService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  backClicked() {
    this.location.back();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      description: null,
    });
  }

  protected reset(): void {
    this.resourceForm.reset({
      name: null,
      description: null,
    });
  }

}
