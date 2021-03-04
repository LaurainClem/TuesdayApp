import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JalonModel } from '../models/jalon.model';

@Injectable({
  providedIn: 'root',
})
export class JalonsService {
  constructor(private readonly http: HttpClient) {}

  public FindAll(idProject: number): Observable<JalonModel[]> {
    return this.http.get<JalonModel[]>(
      `${environment.baseUrl}/projects/${idProject}/jalons`
    );
  }
}
