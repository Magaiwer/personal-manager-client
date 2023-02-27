import {NgModule} from '@angular/core';
import {NbMenuModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {SharedModule} from '../../shared/shared.module';

import {CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG} from 'ng2-currency-mask';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
};


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    SharedModule,
    CurrencyMaskModule,
  ],
  declarations: [
    PagesComponent,
    UserRegistrationComponent,
  ],
  providers: [
    {provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig},
  ],
})
export class PagesModule {
}
