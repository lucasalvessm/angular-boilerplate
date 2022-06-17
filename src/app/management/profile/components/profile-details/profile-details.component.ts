import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { messages } from 'src/app/shared/messages';
import { isFieldInvalid } from 'src/app/shared/utils/form-utils';
import { Profile } from '../../profile.model';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  applicationMessages = messages;
  isFormFieldInvalid = isFieldInvalid;
  form: FormGroup;
  profile: Profile | undefined;
  profiles: Profile[] = [];
  title = '';
  isLoading = false;
  disableButton = false;
  showPassword = false;
  timeoutMessage = 5000;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) {
    this.form = this.fb.group({
      id: [''],
      description: ['', [Validators.required, Validators.maxLength(150)]],
    });
  }

  public get isFormDisabled(): boolean {
    return this.form.invalid || this.disableButton;
  }

  async ngOnInit() {
    const {
      snapshot: {
        params: { id },
      },
    } = this.activatedRoute;

    if (!id) {
      this.title = 'Novo perfil';
      return;
    }

    this.isLoading = true;
    this.title = 'Editar perfil';

    this.getProfileById(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (profile) => {
          this.profile = profile;
          this.form.patchValue(profile);
        },
        (error) => {
          console.log(error);
          this.handleGetProfileError(id);
        },
      );
  }

  public onSubmit(): void {
    if (this.profile) {
      this.update();
    } else {
      this.create();
    }
  }

  public goBack(): void {
    this.router.navigate(['management/profiles']);
  }

  public showAndHide() {
    this.showPassword = !this.showPassword;
  }

  private getProfileById(id: any): Observable<any> {
    return this.profileService.getById(id).pipe(take(1));
  }

  private handleGetProfileError(id: any) {
    if (id) {
      this.alertComponent?.setAlertMessage(
        {
          type: 'danger',
          message: `Não foi possível carregar os dados do perfil. Um novo perfil será criado.`,
        },
        this.timeoutMessage,
      );
    }
  }

  private create() {
    this.isLoading = true;
    this.disableButton = true;

    const values = this.form.value;

    this.profileService
      .create(values)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.disableButton = false;
        }),
      )
      .subscribe(
        () => {
          this.alertComponent?.setAlertMessage(
            {
              type: 'success',
              message: `Perfil ${values.description} criado com sucesso.`,
            },
            this.timeoutMessage,
          );
        },
        () => {
          this.isLoading = false;
          this.disableButton = false;
          this.alertComponent?.setAlertMessage(
            {
              type: 'danger',
              message: `Não foi possível criar o perfil ${this.form.value.description}.`,
            },
            this.timeoutMessage,
          );
        },
      );
  }

  private update() {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Alterar perfil';
    modalRef.componentInstance.subtitle = `Confirma a alteração no perfil selecionado?`;

    modalRef.result.then((result) => {
      if (!result) {
        return;
      }

      this.isLoading = true;
      this.disableButton = true;

      const values = this.form.value;

      this.profileService
        .update(values.id as number, values)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.disableButton = false;
          }),
        )
        .subscribe(
          () => {
            this.alertComponent?.setAlertMessage(
              {
                type: 'success',
                message: `Perfil ${values.description} alterado com sucesso.`,
              },
              this.timeoutMessage,
            );
          },
          () => {
            this.isLoading = false;
            this.disableButton = false;
            this.alertComponent?.setAlertMessage(
              {
                type: 'danger',
                message: `Não foi possível alterar o perfil ${this.form.value.description}.`,
              },
              this.timeoutMessage,
            );
          },
        );
    });
  }
}
