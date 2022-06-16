import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Profile>> {
    return this.http.get<Array<Profile>>(`${environment.apiUrl}/profiles`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/profiles/${id}`);
  }

  create(profile: Profile): Observable<any> {
    return this.http.post(`${environment.apiUrl}/profiles`, profile);
  }

  update(id: number, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${environment.apiUrl}/profiles/${id}`, profile);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/profiles/${id}`);
  }
}
