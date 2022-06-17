import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { Profile } from 'src/app/management/profile/profile.model';
import { ProfileService } from 'src/app/management/profile/service/profile.service';
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
  profiles: Profile[] = [];
  userProfiles: Profile[] = [];
  availableProfiles: Profile[] = [];
  title = '';
  isLoading = false;
  disableButton = false;
  showPassword = false;
  timeoutMessage = 5000;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) {
    this.form = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.maxLength(150)]],
      lastName: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.maxLength(200)]],
      username: ['', [Validators.required, Validators.maxLength(150)]],
      password: ['', [Validators.required, Validators.maxLength(120)]],
      isSuperuser: [false, Validators.required],
      isStaff: [false, Validators.required],
      isActive: [false, Validators.required],
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

    this.isLoading = true;

    this.getProfiles().subscribe((profiles) => {
      this.profiles = profiles;
      this.setAvailableProfiles();
    });

    if (!id) {
      this.title = 'Novo usuário';
      this.isLoading = false;
      return;
    }

    this.title = 'Editar usuário';

    forkJoin([this.getUserById(id), this.getUserProfilesById(id)])
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (results) => {
          this.user = results[0];
          this.form.patchValue(results[0]);

          this.userProfiles = results[1];

          this.setAvailableProfiles();
        },
        (error) => {
          console.log(error);
          this.handleGetUserError(id);
        },
      );
  }

  public onSubmit(): void {
    if (this.user) {
      this.update();
    } else {
      this.create();
    }
  }

  public goBack(): void {
    this.router.navigate(['management/users']);
  }

  public showAndHide() {
    this.showPassword = !this.showPassword;
  }

  public removeUserProfile(profile: Profile) {
    this.userProfiles.splice(this.userProfiles.indexOf(profile), 1);
    this.availableProfiles.push(profile);
  }

  public selectUserProfile(profileId: string) {
    const profile: any = this.availableProfiles.find((availableProfile) => availableProfile.id === Number(profileId));
    this.availableProfiles.splice(this.availableProfiles.indexOf(profile), 1);
    this.userProfiles.push(profile);
  }

  private getUserById(id: any): Observable<any> {
    return this.userService.getById(id).pipe(take(1));
  }

  private getUserProfilesById(id: any): Observable<any> {
    return this.userService.getProfilesByUserId(id).pipe(take(1));
  }

  private setAvailableProfiles() {
    this.availableProfiles = this.profiles.filter(
      (profile) => !this.userProfiles.find((userProfile) => userProfile.id === profile.id),
    );
  }

  private handleGetUserError(id: any) {
    if (id) {
      this.alertComponent?.setAlertMessage(
        {
          type: 'danger',
          message: `Não foi possível carregar os dados do usuário. Um novo usuário será criado.`,
        },
        this.timeoutMessage,
      );
    }
  }

  private getProfiles(): Observable<any> {
    return this.profileService.getAll().pipe(take(1));
  }

  private create() {
    this.isLoading = true;
    this.disableButton = true;

    const values = this.form.value;

    this.userService.create(values).subscribe(
      (user) => {
        this.userService
          .setProfilesByUserId(user.id, this.userProfiles)
          .pipe(
            finalize(() => {
              this.isLoading = false;
              this.disableButton = false;
            }),
          )
          .subscribe(() => {
            this.alertComponent?.setAlertMessage(
              {
                type: 'success',
                message: `Usuário ${values.username} criado com sucesso.`,
              },
              this.timeoutMessage,
            );
          });
      },
      () => {
        this.isLoading = false;
        this.disableButton = false;
        this.alertComponent?.setAlertMessage(
          {
            type: 'danger',
            message: `Não foi possível criar o usuário ${this.form.value.username}.`,
          },
          this.timeoutMessage,
        );
      },
    );
  }

  private update() {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Alterar usuário';
    modalRef.componentInstance.subtitle = `Confirma a alteração no usuário selecionado?`;

    modalRef.result.then((result) => {
      if (!result) {
        return;
      }

      this.isLoading = true;
      this.disableButton = true;

      const values = this.form.value;

      this.userService.update(values.id as number, values).subscribe(
        () => {
          this.userService
            .setProfilesByUserId(values.id, this.userProfiles)
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
                    message: `Usuário ${values.username} alterado com sucesso.`,
                  },
                  this.timeoutMessage,
                );
              },
              () => {
                this.alertComponent?.setAlertMessage(
                  {
                    type: 'danger',
                    message: `Usuário alterado, mas não foi possível associar os perfis.`,
                  },
                  this.timeoutMessage,
                );
              },
            );
        },
        () => {
          this.isLoading = false;
          this.disableButton = false;
          this.alertComponent?.setAlertMessage(
            {
              type: 'danger',
              message: `Não foi possível alterar o usuário ${this.form.value.username}.`,
            },
            this.timeoutMessage,
          );
        },
      );
    });
  }
}
