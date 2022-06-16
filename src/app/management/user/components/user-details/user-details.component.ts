import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { messages } from 'src/app/shared/messages';
import { isFieldInvalid } from 'src/app/shared/utils/form-utils';
import { UserService } from '../../service/user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  applicationMessages = messages;
  isFormFieldInvalid = isFieldInvalid;
  form: FormGroup;
  user: User | undefined;
  title = '';
  isLoading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.maxLength(150)]],
      lastName: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.maxLength(200)]],
      username: ['', [Validators.required, Validators.maxLength(150)]],
      password: ['', [Validators.required, Validators.maxLength(120)]],
      isSuperuser: ['', Validators.required],
      isStaff: ['', Validators.required],
      isActive: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const {
      snapshot: {
        params: { id },
      },
    } = this.activatedRoute;

    if (!id) {
      this.title = 'Novo usuário';
      return;
    }

    this.title = 'Editar Usuário';
    this.isLoading = true;
    this.userService
      .getById(id)
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe(
        (user) => {
          this.user = user;
          this.form.patchValue(user);
        },
        () => {
          if (id) {
            this.alertComponent?.setAlertMessage(
              {
                type: 'danger',
                message: `Não foi possível carregar os dados do usuário. Um novo usuário será criado.`,
              },
              10000,
            );
          }
        },
      );
  }

  public onSubmit(): void {
    console.log('onSubmit');
    console.log(this.form.value);
  }

  public goBack(): void {
    this.router.navigate(['management/users']);
  }
}
