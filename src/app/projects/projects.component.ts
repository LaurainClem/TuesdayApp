import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../models/project.model';
import { ProjectsService } from '../services/projects.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: ProjectModel[] = [];

  constructor(
    private readonly projectsService: ProjectsService,
    public readonly sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.projectsService.FindAll().subscribe((r) => {
      this.projects = r;
    });
  }
}
