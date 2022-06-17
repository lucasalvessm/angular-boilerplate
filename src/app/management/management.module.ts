import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { UserDetailsComponent } from './user/components/user-details/user-details.component';
import { UserTableComponent } from './user/components/user-table/user-table.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { SharedModule } from '../shared/modules/shared.module';
import { ProfileListComponent } from './profile/components/profile-list/profile-list.component';
import { ProfileTableComponent } from './profile/components/profile-table/profile-table.component';
import { ProfileDetailsComponent } from './profile/components/profile-details/profile-details.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserTableComponent,
    ProfileListComponent,
    ProfileDetailsComponent,
    ProfileTableComponent,
  ],
  imports: [CommonModule, ManagementRoutingModule, SharedModule],
})
export class ManagementModule {}
