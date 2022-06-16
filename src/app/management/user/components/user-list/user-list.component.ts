import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { messages } from 'src/app/shared/messages';
import { UserService } from '../../service/user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;

  users: User[] = [];
  errorMessage: string | undefined;
  spinner = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public createNewUser(): void {
    this.router.navigate(['/management/users/new']);
  }

  public editUser(user: User): void {
    this.router.navigate([`/management/users/${user.id}/edit`]);
  }

  public onUserDeleted(user: User): void {
    this.spinner = true;
    this.userService
      .delete(user.id)
      .pipe(
        take(1),
        finalize(() => (this.spinner = false)),
      )
      .subscribe(
        () => {
          this.removeUser(user);
          this.alertComponent?.setAlertMessage({
            type: 'success',
            message: messages.userDeletedSuccessfully,
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
    this.getUsers();
  }

  private removeUser(user: User): void {
    const deletedUserIndex = this.users.indexOf(user);
    const usersCopy = [...this.users];
    usersCopy.splice(deletedUserIndex as number, 1);
    this.users = usersCopy;
  }

  private getUsers() {
    this.userService
      .getAll()
      .pipe(take(1))
      .subscribe(
        (users) => {
          this.users = users;
        },
        () => (this.errorMessage = messages.unexpectedError),
      );
  }
}
