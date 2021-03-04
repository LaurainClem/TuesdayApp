import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectModel } from '../models/project.model';
import { ProjectsService } from '../services/projects.service';
import { SharedService } from '../services/shared.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: ProjectModel[];

  constructor(
    private readonly projectsService: ProjectsService,
    public readonly sharedService: SharedService,
    private readonly userService: UsersService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.projectsService.FindAll().subscribe(
      (r) => {
        this.projects = r;
        this.projects.forEach((project) => {
          this.userService.findOne(project.assigneeId).subscribe(
            async (r) => {
              project.assignee = r;
              project.status = await this.sharedService.GetProjectStatus(
                project
              );
              project.percent = await this.sharedService.GetProjectProgress(
                project
              );
              project.realEndDate = this.GetDate(project.realEndDate);
              project.realStartDate = this.GetDate(project.realStartDate);
              project.plannedEndDate = this.GetDate(project.plannedEndDate);
              project.plannedStartDate = this.GetDate(project.plannedStartDate);
              console.log(project);
            },
            () => {
              this.sharedService.ShowErrorNotification();
            }
          );
        });
      },
      () => {
        this.sharedService.ShowErrorNotification();
      }
    );
  }

  public GetDate(dateString: string): Date {
    return new Date(dateString);
  }

  public GetDelay(plannedDate: Date, realDate: Date) {
    return (plannedDate.getTime() - realDate.getTime()) / (1000 * 3600 * 24);
  }
}
