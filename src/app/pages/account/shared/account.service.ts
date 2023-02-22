import {Injectable, Injector} from '@angular/core';

import {Account} from './account.model';
import {BaseResourceService} from '../../../../shared/service/base-resource.service';


@Injectable({providedIn: 'root'})
export class AccountService extends BaseResourceService<Account> {

  constructor(protected injector: Injector) {
    super('account', injector);
  }
}
