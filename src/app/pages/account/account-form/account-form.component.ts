import { Validators } from '@angular/forms';
import { AccountService } from "./../shared/account.service";
import { Account } from "./../shared/account.model";
import { Component, Injector, OnInit } from "@angular/core";
import { BaseResourceFormComponent } from "../../../../shared/components/base-resource-form/base-resource-form.component";
import { Location } from '@angular/common';

@Component({
  selector: "ngx-account-form",
  templateUrl: "./account-form.component.html",
  styleUrls: ["./account-form.component.scss"],
})
export class AccountFormComponent extends BaseResourceFormComponent<Account> implements OnInit
{
  constructor(
    protected accountService: AccountService,
    protected injector: Injector,
    protected location: Location
  ) {
    super(injector, accountService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  backClicked() {
    this.location.back();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [],
      name: ["",Validators.compose([Validators.required, Validators.minLength(3)])],
      description: null,
    });
  }

  protected reset(): void {
    this.resourceForm.reset({
      name: null,
      description: null,
    });
  }
}
