import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryFormComponent} from './category-form/category.component';
import {CategoryRoutingModule} from './category-routing.module';
import {SharedModule} from '../../../shared/shared.module';


export const routes = [
  { path: '', component: CategoryListComponent },
];


@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryRoutingModule,
    SharedModule,
  ],
})
export class CategoryModule {
}
