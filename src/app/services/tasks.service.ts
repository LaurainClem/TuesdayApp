import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private readonly http: HttpClient) {}

  public FindAll(idProject: number, idJalon: number): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(
      `${environment.baseUrl}/projects/${idProject}/jalons/${idJalon}/tasks`
    );
  }
}
