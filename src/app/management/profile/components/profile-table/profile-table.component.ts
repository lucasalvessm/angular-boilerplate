import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { Profile } from '../../profile.model';

@Component({
  selector: 'app-profile-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.scss'],
})
export class ProfileTableComponent implements OnInit {
  @Input() profiles: Profile[] | undefined;
  @Output() profileDeleted = new EventEmitter<Profile>();
  @Output() profileEdited = new EventEmitter<Profile>();

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  onDelete(profile: Profile): void {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Excluir Usuário';
    modalRef.componentInstance.subtitle = `Deseja excluir o perfil ${profile.description}?`;

    modalRef.result.then((result) => {
      if (result) {
        this.profileDeleted.emit(profile);
      }
    });
  }

  onEdit(profile: Profile): void {
    this.profileEdited.emit(profile);
  }
}
