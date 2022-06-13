import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./authorization/authorization.module').then((m) => m.AuthorizationModule),
  },
  {
    path: 'management',
    loadChildren: () => import('./management/management.module').then((m) => m.ManagementModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'management',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
