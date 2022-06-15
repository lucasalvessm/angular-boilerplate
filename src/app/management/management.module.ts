import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile/profile.component';
import { ManagementRoutingModule } from './management-routing.module';
import { UserDetailsComponent } from './user/components/user-details/user-details.component';
import { UserTableComponent } from './user/components/user-table/user-table.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
  declarations: [ProfileComponent, UserListComponent, UserDetailsComponent, UserTableComponent],
  imports: [CommonModule, ManagementRoutingModule, SharedModule],
})
export class ManagementModule {}
