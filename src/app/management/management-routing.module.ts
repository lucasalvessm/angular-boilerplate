import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDetailsComponent } from './profile/components/profile-details/profile-details.component';
import { ProfileListComponent } from './profile/components/profile-list/profile-list.component';
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
    component: ProfileListComponent,
  },
  {
    path: 'profiles/:id/edit',
    component: ProfileDetailsComponent,
  },
  {
    path: 'profiles/new',
    component: ProfileDetailsComponent,
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
