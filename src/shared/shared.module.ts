import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NgModule } from '@angular/core';
import {
  NbAccordionModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule, NbTreeGridModule,
  NbUserModule,
} from '@nebular/theme';

import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import {ThemeModule} from '../app/@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSortModule} from '@angular/material/sort';
import {FormFieldErrorComponent} from './components/form-field-error/form-field-error.component';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    FlexLayoutModule,
    NbAccordionModule,
    CalendarModule,
    ReactiveFormsModule,
    NbDateFnsDateModule,
  ],
  exports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    FlexLayoutModule,
    FormFieldErrorComponent,
    NbAccordionModule,
    ReactiveFormsModule,
    NbDateFnsDateModule,
  ],
  declarations: [
    FormFieldErrorComponent,
  ],
})
export class SharedModule {
}
