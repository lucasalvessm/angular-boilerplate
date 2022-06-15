import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../user.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  @Input() users: User[] | undefined;
  @Output() userDeleted = new EventEmitter<User>();

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    console.log(this.users);
  }

  onDelete(user: User) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Excluir Usuário';
    modalRef.componentInstance.subtitle = `Deseja excluir o usuário ${user.firstName} ${user.lastName}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.userDeleted.emit(user);
      }
    });
  }
}
