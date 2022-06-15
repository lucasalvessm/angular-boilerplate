import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './components/profile/profile.component';
import { ManagementRoutingModule } from './management-routing.module';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UserTableComponent } from './components/user/user-table/user-table.component';

@NgModule({
  declarations: [ProfileComponent, UserListComponent, UserDetailsComponent, UserTableComponent],
  imports: [CommonModule, ManagementRoutingModule],
})
export class ManagementModule {}
