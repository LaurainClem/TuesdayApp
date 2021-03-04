import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProjectModel } from '../models/project.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private readonly http: HttpClient) {}

  public FindAll(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(`${environment.baseUrl}/projects`);
  }

  public Add(project: { label: string; assignee: UserModel }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/projects`, {
      label: project.label,
      assigneeId: project.assignee.id,
    });
  }
}
