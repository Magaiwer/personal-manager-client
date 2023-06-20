import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import {AfterViewInit, Component, Directive, Injector, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {BaseResourceModel} from '../../model/base-resource.model';
import {BaseResourceService} from '../../service/base-resource.service';
import {CustomDataSource} from '../../custom-datasource/custom-datasource';

import {merge} from 'rxjs';
import { take, tap, filter } from 'rxjs/operators';

@Component({
  template: '',
})
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: CustomDataSource<T>;
  public displayedColumns = Array<string>();
  public displayedPageSizeOptions = [5, 10, 20, 25, 50];
  public pageSize = 20;
  public recordCount: number;
  public isPageable: boolean = true;
  public resources: T[];
  public filterValues: any = {};
  private toastService : NbToastrService;

  private HTTP_4xx = '4';

  public showSearch = false;

  protected constructor(protected resourceService: BaseResourceService<T>,
                        protected injector: Injector,
    ) {
    this.resourceService = resourceService;
    this.dataSource = new CustomDataSource<T>(this.resourceService);
    this.toastService = this.injector.get(NbToastrService);

  }

  ngOnInit() {
    console.log('Filtro oriundo from chield component', this.filterValues);
    this.loadResources();
    this.dataSource.loadDataSource(this.displayedColumns[0], 'asc', 0, this.pageSize, this.isPageable, this.filterValues);
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
          error => this.actionsForError(error),
        );
    }
  }

  loadResources() {
    this.dataSource.data.asObservable().subscribe(d => this.resources = d);
  }


  protected actionsForError(error) {
    let message = 'Ocorreu um erro ao processar a sua solicitação!';
   if (error.status.toString().startsWith(this.HTTP_4xx)) {
      message = error.error.userMessage ? error.error.userMessage : message;
      this.showToast('danger', message);


    } else {
      this.showToast('danger', message);
    }
  }

  protected showToast(status: NbComponentStatus, message: String) {
    this.toastService.show(message, null, {status});
  }

}
