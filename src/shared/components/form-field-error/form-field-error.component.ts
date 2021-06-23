import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.css'],
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;
  constructor() { }

  ngOnInit() {
  }

  get errorMessage(): string | null {
    if (this.mustShowErrorMessage) {
      return '';
    } else {
      return null;
    }
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors.required) {
      return `${this.formControl} é obrigatório`;

    } else if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `${this.formControl} deve conter no minímo ${requiredLength} caracteres`;

    } else if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `${this.formControl} deve conter no maxímo ${requiredLength} caracteres`;
    }
  }
}
