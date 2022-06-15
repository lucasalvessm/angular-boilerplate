import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${environment.apiUrl}/users`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${id}`);
  }

  create(user: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/users/${id}`, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
}
