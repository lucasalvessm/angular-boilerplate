import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [UserComponent, ProfileComponent],
  imports: [CommonModule, UserManagementRoutingModule],
})
export class UserManagementModule {}
