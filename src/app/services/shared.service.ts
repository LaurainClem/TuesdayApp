import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { JalonModel } from '../models/jalon.model';
import { ProjectModel } from '../models/project.model';
import { TaskModel } from '../models/task.model';
import { UserModel } from '../models/user.model';
import { JalonsService } from './jalons.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private readonly notifs: NzNotificationService,
    private readonly jalonService: JalonsService
  ) {}

  public GetTrigram(user: UserModel): string {
    let trigram = '';
    trigram += user.firstName.toUpperCase().slice(0, 1);
    trigram += user.lastName.toUpperCase().slice(0, 2);
    return trigram;
  }

  public ShowErrorNotification(): void {
    console.log('pwet');
    this.notifs.create(
      'error',
      'Error occured',
      'An error occured during the communication with the server please try a few times later'
    );
  }

  public GetProjectStatus(project: ProjectModel): Promise<'done' | 'progress'> {
    return new Promise((resolve, reject) => {
      this.jalonService.FindAll(project.id).subscribe(
        (jalons) => {
          const jalonsCompleted: JalonModel[] = [];
          jalons.forEach((jalon) => {
            if (jalon.realEndDate.toString() !== '0001-01-01T00:00:00') {
              jalonsCompleted.push(jalon);
            }
          });
          resolve(
            jalonsCompleted.length === jalons.length && jalons.length !== 0
              ? 'done'
              : 'progress'
          );
        },
        () => {
          this.ShowErrorNotification();
          reject();
        }
      );
    });
  }

  public GetTaskStatus(task: TaskModel) {
    if (task.realEndDate.toString() !== '0001-01-01T00:00:00') {
      return 'done';
    } else if (task.realStartDate.toString() !== '0001-01-01T00:00:00') {
      return 'progress';
    } else {
      return 'waiting';
    }
  }

  public GetProjectProgress(project: ProjectModel): Promise<number> {
    return new Promise((resolve, reject) => {
      this.jalonService.FindAll(project.id).subscribe(
        (jalons) => {
          const jalonsCompleted: JalonModel[] = [];
          jalons.forEach((jalon) => {
            if (jalon.realEndDate.toString() !== '0001-01-01T00:00:00') {
              jalonsCompleted.push(jalon);
            }
          });
          resolve((jalonsCompleted.length * 100) / jalons.length);
        },
        () => {
          this.ShowErrorNotification();
          reject();
        }
      );
    });
  }

  public GetJalonProgress(jalon: JalonModel) {
    const tasksCompleted: TaskModel[] = [];
    const tasksProgress: TaskModel[] = [];
    jalon.tasks.forEach((task) => {
      if (task.status === 'progress') {
        tasksProgress.push(task);
      } else if (task.status === 'done') {
        tasksCompleted.push(task);
      }
    });
    return (
      (tasksCompleted.length * 100) / jalon.tasks.length +
      (tasksProgress.length * 100) / 2 / jalon.tasks.length
    );
  }
}
