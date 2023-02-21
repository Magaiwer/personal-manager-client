import { Injectable, Injector, Type } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseResourceModel} from '../model/base-resource.model';

import {environment} from '../../environments/environment';
import {PageableWrapper} from './pageable-wrapper';

import {Observable, throwError} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;
  url = environment.baseUrl;

  protected constructor(protected apiPath: string,
                        protected injector: Injector,
  ) {
    this.http = this.injector.get<HttpClient>(HttpClient as Type<HttpClient>);
    this.url = this.url + apiPath;
  }

  findAll(): Observable<PageableWrapper | T[]> {
    return this.http.get<PageableWrapper | T[]>(this.url);
  }

  findAllPageable(sort = '', order = 'asc', page = 0, size = 10): Observable<PageableWrapper> {
    const params = new HttpParams()
      .set('size', size.toString())
      .set('sort', sort + ',' + order)
      .set('page', page.toString());

    return this.http.get<PageableWrapper>(this.url, {params});
  }

  findById(id: number): Observable<T> {
    const url = `${this.url}/${id}`;
    return this.http.get<T>(url);
  }

  save(resource: T) {
    return this.http.post(this.url, resource);
  }

  update(resource: T): Observable<T> {
    const url = `${this.url}/${resource.id}`;
    return this.http.put(url, resource).pipe(
      take(1),
      map(() => resource),
    );
  }

  delete(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }

  protected handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
