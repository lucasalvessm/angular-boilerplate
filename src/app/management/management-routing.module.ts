import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailsComponent } from './user/components/user-details/user-details.component';
import { UserListComponent } from './user/components/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'users/:id/edit',
    component: UserDetailsComponent,
  },
  {
    path: 'users/new',
    component: UserDetailsComponent,
  },
  {
    path: 'profiles',
    component: ProfileComponent,
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
