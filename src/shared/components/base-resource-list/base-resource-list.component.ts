import {AfterViewInit, Component, Directive, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {BaseResourceModel} from '../../model/base-resource.model';
import {BaseResourceService} from '../../service/base-resource.service';
import {CustomDataSource} from '../../custom-datasource/custom-datasource';

import {merge} from 'rxjs';
import {take, tap} from 'rxjs/operators';

@Component({
  template: '',
})
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: CustomDataSource<T>;
  public displayedColumns = Array<string>();
  public displayedPageSizeOptions = [5, 10, 20, 25, 50];
  public pageSize = 5;
  public recordCount: number;
  public isPageable: boolean = true;

  public showSearch = false;

  protected constructor(protected resourceService: BaseResourceService<T>) {
    this.resourceService = resourceService;
    this.dataSource = new CustomDataSource<T>(this.resourceService);

  }

  ngOnInit() {
    this.dataSource.loadDataSource(this.displayedColumns[0], 'asc', 0, this.pageSize, this.isPageable);
    this.dataSource.recordCount$.subscribe(value => this.recordCount = value);
  }

  ngAfterViewInit(): void {
    this.paginatorSubscribe();
    this.resetPaginatorAfterSort();
    this.mergeSortAndPaginatorEvent();

  }

  private mergeSortAndPaginatorEvent() {
    if (this.sort) {
      merge(this.sort?.sortChange, this.paginator?.page)
        .pipe(
          tap(() => this.loadData()),
        ).subscribe();
    }
  }

  private paginatorSubscribe() {
    this.paginator?.page
      .pipe(
        tap(() => this.loadData()),
      ).subscribe();
  }

  private resetPaginatorAfterSort() {
    this.sort?.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  private loadData() {
    this.dataSource.loadDataSource(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
   // this.dataSource.filter = filterValue;
  }

  onDelete(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.resourceService.delete(resource.id)
        .pipe(take(1))
        .subscribe(
          () => this.loadData(),
        );
    }
  }
}
