import { Injectable, Injector, Type } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BaseResourceModel} from '../model/base-resource.model';

import {environment} from '../../environments/environment';
import {PageableWrapper} from './pageable-wrapper';
import { formatISO } from 'date-fns';
import { DateUtil } from '../../shared/util/date-util';

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

  findAll(pathExtend = ''): Observable<PageableWrapper | T[]> {
    return this.http.get<PageableWrapper | T[]>(this.url + pathExtend);
  }

  findByFilterPageable(sort = '', order = 'asc', page = 0, size = 10, filters = {}, pathExtend = ''): Observable<PageableWrapper | T[]> {
    let params = new HttpParams()
      .set('size', size.toString())
      .set('sort', sort + ',' + order)
      .set('page', page.toString());

    for (const [key, value] of Object.entries<any>(filters)) {
      pathExtend = '/filter'
      if(value) {
        params = params.append(key, DateUtil.isDate(value) ? formatISO(value) : value );
      }
    }
    const urlComplete = this.url + pathExtend;
    return this.http.get<PageableWrapper| T[]>(urlComplete, {params});
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
