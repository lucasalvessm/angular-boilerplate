import { FormGroup } from '@angular/forms';

export const isFieldInvalid = (form: FormGroup, field: string): boolean =>
  form.controls[field].invalid && form.controls[field].touched;
