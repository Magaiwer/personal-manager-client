import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CategoryFormComponent} from './category-form/category.component';
import {CategoryListComponent} from './category-list/category-list.component';


const routes: Routes = [
  {path: '', component: CategoryListComponent},
  {path: 'new', component: CategoryFormComponent, data: {breadcrumb: 'Novo'}},
  {path: ':id/edit', component: CategoryFormComponent, data: {breadcrumb: 'Edicao'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {
}
