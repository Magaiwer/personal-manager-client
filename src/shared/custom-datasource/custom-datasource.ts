import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { catchError, finalize, filter } from 'rxjs/operators';

import {BaseResourceService} from '../service/base-resource.service';
import {PageableWrapper} from '../service/pageable-wrapper';

export class CustomDataSource<T> extends DataSource<T> {
  private resourceSubject = new BehaviorSubject<T[]>([]);
  private recordCount = new BehaviorSubject<number>(0);
  private isLoading = new BehaviorSubject<Boolean>(false);

  public recordCount$ = this.recordCount.asObservable();
  public isLoading$ = this.isLoading.asObservable();
  public data = this.resourceSubject;

  constructor(private resourceService: BaseResourceService<T>) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[] | ReadonlyArray<any>> {
    return this.resourceSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.resourceSubject.complete();
    this.isLoading.complete();
  }

  loadDataSource(sort = '', order = 'asc', pageIndex = 0, pageSize = 10,
                 isPageable = true, filter = {}): void {
    this.isLoading.next(true);

    if (isPageable) {
      this.resourceService.findByFilterPageable(sort, order, pageIndex, pageSize, filter)
        .pipe(
          catchError(() => of([])),
          finalize(() => this.isLoading.next(false)),
        ).subscribe((value: PageableWrapper) => {
        this.resourceSubject.next(value?.content);
        this.recordCount.next(value?.totalElements);
      });
    } else {
      this.resourceService.findAll()
        .pipe(
          catchError(() => of([])),
          finalize(() => this.isLoading.next(false)),
        ).subscribe((value: T[]) => {
        this.resourceSubject.next(value);
        this.recordCount.next(value.length);
      });
    }
  }
}
