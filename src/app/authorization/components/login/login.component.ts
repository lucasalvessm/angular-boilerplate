import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { finalize, take } from 'rxjs/operators';
import { isFieldInvalid } from 'src/app/shared/utils/form-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginErrorMessage: string | undefined;
  form: FormGroup;
  disableButton = false;
  canShowComponent = false;
  isFormFieldInvalid = isFieldInvalid;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public get isFormDisabled(): boolean {
    return this.form.invalid || this.disableButton;
  }

  public ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
      return;
    }

    this.canShowComponent = true;
  }

  public onSubmit(): void {
    this.loginErrorMessage = undefined;
    this.disableButton = true;
    this.authService
      .login(this.form.value)
      .pipe(
        take(1),
        finalize(() => (this.disableButton = false)),
      )
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.handleError(error);
        },
      );
  }

  public close(): void {
    this.loginErrorMessage = undefined;
  }

  private handleError(error: any) {
    this.loginErrorMessage = error.message;
  }
}
