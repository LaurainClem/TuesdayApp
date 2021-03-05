import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JalonModel } from '../models/jalon.model';
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
}
