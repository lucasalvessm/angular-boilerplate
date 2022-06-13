import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ManagementRoutingModule } from './management-routing.module';

@NgModule({
  declarations: [UserComponent, ProfileComponent],
  imports: [CommonModule, ManagementRoutingModule],
})
export class ManagementModule {}
