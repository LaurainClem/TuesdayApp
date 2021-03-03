import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProjectModel } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private readonly http: HttpClient) {}

  public FindAll(): Observable<ProjectModel[]> {
    /* const projects: ProjectModel[] = [
      {
        Id: 1,
        Label: 'Esimed',
        Assignee: { Id: 1, FirstName: 'Clem', LastName: 'Laurain' },
        PlannedStartDate: new Date(),
        RealStartDate: new Date(),
        Status: 'progress',
      },
      {
        Id: 2,
        Label: 'Vocaza',
        Assignee: { Id: 2, FirstName: 'Henri', LastName: 'Michelon' },
        PlannedStartDate: new Date(),
        RealStartDate: new Date(),
        Status: 'done',
      },
    ]; */
    return this.http.get<ProjectModel[]>(`${environment.baseUrl}/projects`);
  }
}
