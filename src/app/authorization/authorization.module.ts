import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/modules/shared.module';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, AuthorizationRoutingModule],
})
export class AuthorizationModule {}
