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

  public FindOne(idProject: number): Observable<ProjectModel> {
    return this.http.get<ProjectModel>(
      `${environment.baseUrl}/projects/${idProject}`
    );
  }

  public Update(project: ProjectModel): Observable<any> {
    const projectUpdated = {
      label: project.label,
      assigneeId: project.assigneeId,
    };
    return this.http.patch(
      `${environment.baseUrl}/projects/${project.id}`,
      projectUpdated
    );
  }

  public Delete(project: ProjectModel): Observable<ProjectModel[]> {
    return this.http.delete<ProjectModel[]>(
      `${environment.baseUrl}/projects/${project.id}`
    );
  }
}
