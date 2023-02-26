import { Component, OnInit, Injector } from '@angular/core';
import {BaseResourceListComponent} from '../../../../shared/components/base-resource-list/base-resource-list.component';
import {Account} from '../shared/account.model';
import {AccountService} from '../shared/account.service';

@Component({
  selector: 'ngx-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent extends BaseResourceListComponent<Account> implements OnInit {

  constructor(protected accountService: AccountService,
              protected injector: Injector
  ) {
    super(accountService, injector );
    this.displayedColumns = ['id', 'name', 'description', 'actions'];
  }
}
