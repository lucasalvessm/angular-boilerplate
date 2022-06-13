import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../authorization.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<any> {
    return this.http.post(`${this.api}/login`, request).pipe(tap(this.setSession));
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public getAccessToken(): string | null {
    return localStorage.getItem('id_token');
  }

  public isLoggedIn(): boolean {
    return this.getExpiration() > new Date().getTime();
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private getExpiration(): number {
    const expiration: any = localStorage.getItem('expires_at');
    return parseInt(expiration, 10);
  }

  private setSession(authResult: any): void {
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', '' + new Date().getTime() + authResult.expiresIn * 1000);
  }
}
