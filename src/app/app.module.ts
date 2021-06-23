/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import { ptBR } from 'date-fns/locale';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localept, 'pt');
import localept from '@angular/common/locales/pt';

import {
  NbPasswordAuthStrategy,
  NbAuthModule,
  NbAuthJWTToken,
  NbAuthJWTInterceptor,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
} from '@nebular/auth';

import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';

import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './auth/auth-guard.service';
import {environment} from '../environments/environment';
import {NbDateFnsDateModule} from '@nebular/date-fns';


const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
    error: true,
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({
      format: 'dd/MM/yyyy',
      parseOptions: { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true, locale: ptBR },
      formatOptions: { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true, locale: ptBR },
    }),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
          baseEndpoint: environment.baseUrl,
          login: {
            redirect: {
              success: '/',
              failure: null,
            },
            endpoint: 'login',
            defaultErrors: ['Email/senha estão incorretos, tente novamente!'],
          },
          logout: {
            redirect: {
              success: '/login',
              failure: null,
            },
          },
        }),
      ],
      forms: {
        login: formSetting,
        logout: formSetting,
      },
    }),
    SharedModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: function () { return false; } },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
