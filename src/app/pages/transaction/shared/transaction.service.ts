import {Injectable, Injector} from '@angular/core';

import {Transaction} from './transaction.model';
import {BaseResourceService} from '../../../../shared/service/base-resource.service';


@Injectable({providedIn: 'root'})
export class TransactionService extends BaseResourceService<Transaction> {

  constructor(protected injector: Injector) {
    super('transaction', injector);
  }
}
