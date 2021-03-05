import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExigenceModel, ExigenceType } from '../models/exigence.model';

@Injectable({
  providedIn: 'root',
})
export class ExigencesService {
  constructor(private http: HttpClient) {}

  public FindAll(idProject: number): Observable<ExigenceModel[]> {
    return this.http.get<ExigenceModel[]>(
      `${environment.baseUrl}/projects/${idProject}/exigences`
    );
  }

  public FindOne(
    idProject: number,
    idExigence: number
  ): Observable<ExigenceModel> {
    return this.http.get<ExigenceModel>(
      `${environment.baseUrl}/projects/${idProject}/exigences/${idExigence}`
    );
  }

  public Update(
    exigence: {
      label: string;
      exigenceType: any;
    },
    idProject: number,
    idExigence: number
  ): Observable<ExigenceModel> {
    console.log(exigence);
    return this.http.patch<ExigenceModel>(
      `${environment.baseUrl}/projects/${idProject}/exigences/${idExigence}`,
      exigence
    );
  }

  public Delete(
    idProject: number,
    idExigence: number
  ): Observable<ExigenceModel[]> {
    return this.http.delete<ExigenceModel[]>(
      `${environment.baseUrl}/projects/${idProject}/exigences/${idExigence}`
    );
  }

  public Add(
    exigence: {
      label: string;
      exigenceType: any;
    },
    idProject: number
  ): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/projects/${idProject}/exigences/`,
      exigence
    );
  }
}
