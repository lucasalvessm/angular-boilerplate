import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs/operators';
import { messages } from 'src/app/shared/messages';
import { UserService } from '../../service/user.service';
import { User } from '../../user.model';

export interface Message {
  type: string;
  message: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string | undefined;
  spinner = false;

  alerts: Message[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public tryAgain(): void {
    this.errorMessage = undefined;
    this.getUsers();
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
          this.setAlertMessage({
            type: 'success',
            message: messages.userDeletedSuccessfully,
          });
        },
        () => {
          this.setAlertMessage({
            type: 'danger',
            message: messages.errorOnDelete,
          });
        },
      );
  }

  public closeMessage(message: Message): void {
    const index = this.alerts.indexOf(message);
    this.alerts.splice(index, 1);
  }

  private setAlertMessage(message: Message, timeout = 4000): void {
    this.alerts.push(message);

    setTimeout(() => {
      const index = this.alerts.indexOf(message);
      if (index > -1) {
        this.alerts.splice(index, 1);
      }
    }, timeout);
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
