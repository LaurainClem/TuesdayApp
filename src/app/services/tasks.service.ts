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

  /* public Update(task: TaskModel, idProject: number) {
    const taskUpdated = {}
    this.http.patch(`${environment.baseUrl}/projects/${idProject}/jalons/${task.jalonId}/tasks/${task.id}`, )
  } */

  public Delete(
    idTask: number,
    idJalon: number,
    idProject: number
  ): Observable<TaskModel[]> {
    return this.http.delete<TaskModel[]>(
      `${environment.baseUrl}/projects/${idProject}/jalons/${idJalon}/tasks/${idTask}`
    );
  }
}
