import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './components/profile/profile.component';
import { ManagementRoutingModule } from './management-routing.module';
import { UserDetailsComponent } from './components/user/components/user-details/user-details.component';
import { UserTableComponent } from './components/user/components/user-table/user-table.component';
import { UserListComponent } from './components/user/components/user-list/user-list.component';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
  declarations: [ProfileComponent, UserListComponent, UserDetailsComponent, UserTableComponent],
  imports: [CommonModule, ManagementRoutingModule, SharedModule],
})
export class ManagementModule {}
