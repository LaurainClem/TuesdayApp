import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly http: HttpClient) {}

  public findOne(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.baseUrl}/users/${id}`);
  }

  public findAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${environment.baseUrl}/users`);
  }
}
