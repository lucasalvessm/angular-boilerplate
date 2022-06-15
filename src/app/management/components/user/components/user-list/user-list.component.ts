import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { messages } from 'src/app/shared/messages';
import { User } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] | undefined;
  errorMessage: string | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public tryAgain(): void {
    this.errorMessage = undefined;
    this.getUsers();
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
