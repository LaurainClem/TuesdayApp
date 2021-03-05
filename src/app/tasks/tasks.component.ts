import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JalonModel } from '../models/jalon.model';
import { TaskModel } from '../models/task.model';
import { JalonsService } from '../services/jalons.service';
import { SharedService } from '../services/shared.service';
import { TasksService } from '../services/tasks.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  jalons: JalonModel[];
  isModalVisible = false;
  selectedTask: TaskModel;

  constructor(
    private readonly taskService: TasksService,
    private readonly jalonService: JalonsService,
    private route: ActivatedRoute,
    public readonly sharedService: SharedService,
    public readonly userService: UsersService
  ) {}

  ngOnInit(): void {
    this.jalonService
      .FindAll(+this.route.snapshot.paramMap.get('idProject'))
      .subscribe(
        (r) => {
          this.jalons = r;
          this.jalons.forEach((jalon) => {
            this.userService.findOne(jalon.assigneeId).subscribe(
              (r) => {
                jalon.assignee = r;
              },
              () => {
                this.sharedService.ShowErrorNotification();
              }
            );
            this.taskService
              .FindAll(+this.route.snapshot.paramMap.get('idProject'), jalon.id)
              .subscribe(
                (r) => {
                  jalon.tasks = r;
                  jalon.tasks.forEach((task) => {
                    this.userService.findOne(task.assigneeId).subscribe((r) => {
                      task.assignee = r;
                    });
                    task.status = this.sharedService.GetTaskStatus(task);
                  });
                },
                () => this.sharedService.ShowErrorNotification()
              );
          });
        },
        () => {
          this.sharedService.ShowErrorNotification();
        }
      );
  }

  public GetDelay(plannedEndDate: Date) {
    if (
      new Date(plannedEndDate).toString() !==
      new Date('0001-01-01T00:00:00').toString()
    ) {
      const delay = new Date().getTime() - new Date(plannedEndDate).getTime();
      if (delay < 0) {
        return 0;
      } else {
        return Math.round(delay / 1000 / 3600 / 24);
      }
    } else {
      return 0;
    }
  }

  showModal(task: TaskModel): void {
    this.selectedTask = task;
    this.isModalVisible = true;
  }

  handleOk(): void {
    this.isModalVisible = false;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  /* Update(task: TaskModel): void {
    this.taskService.
  } */

  Delete(): void {
    this.taskService
      .Delete(
        this.selectedTask.id,
        this.selectedTask.jalonId,
        +this.route.snapshot.paramMap.get('idProject')
      )
      .subscribe((r) => {
        this.jalons.find(
          (jalon) => jalon.id === this.selectedTask.jalonId
        ).tasks = r;
        this.jalons
          .find((jalon) => jalon.id === this.selectedTask.jalonId)
          .tasks.forEach((task) => {
            this.userService.findOne(task.assigneeId).subscribe(
              (r) => {
                task.assignee = r;
              },
              () => this.sharedService.ShowErrorNotification()
            );
            task.status = this.sharedService.GetTaskStatus(task);
          });
        this.handleCancel();
      });
  }
}
