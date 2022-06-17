import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { messages } from 'src/app/shared/messages';
import { ProfileService } from '../../service/profile.service';
import { Profile } from '../../profile.model';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;

  profiles: Profile[] = [];
  errorMessage: string | undefined;
  spinner = false;

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.getProfiles();
  }

  public createNewProfile(): void {
    this.router.navigate(['/management/profiles/new']);
  }

  public editProfile(profile: Profile): void {
    this.router.navigate([`/management/profiles/${profile.id}/edit`]);
  }

  public onProfileDeleted(profile: Profile): void {
    this.spinner = true;
    this.profileService
      .delete(profile.id)
      .pipe(
        take(1),
        finalize(() => (this.spinner = false)),
      )
      .subscribe(
        () => {
          this.removeProfile(profile);
          this.alertComponent?.setAlertMessage({
            type: 'success',
            message: messages.profileDeletedSuccessfully,
          });
        },
        () => {
          this.alertComponent?.setAlertMessage({
            type: 'danger',
            message: messages.errorOnDelete,
          });
        },
      );
  }

  public tryAgain(): void {
    this.errorMessage = undefined;
    this.getProfiles();
  }

  private removeProfile(profile: Profile): void {
    const deletedProfileIndex = this.profiles.indexOf(profile);
    const profilesCopy = [...this.profiles];
    profilesCopy.splice(deletedProfileIndex as number, 1);
    this.profiles = profilesCopy;
  }

  private getProfiles() {
    this.profileService
      .getAll()
      .pipe(take(1))
      .subscribe(
        (profiles) => {
          this.profiles = profiles;
        },
        () => (this.errorMessage = messages.unexpectedError),
      );
  }
}
