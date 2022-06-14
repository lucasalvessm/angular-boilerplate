import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './authorization/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
