import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel } from '../models/project.model';
import { UserModel } from '../models/user.model';
import { ProjectsService } from '../services/projects.service';
import { SharedService } from '../services/shared.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
  validateForm!: FormGroup;
  users: UserModel[] = [];
  assignee: UserModel;
  isLoading = true;
  project: ProjectModel;

  constructor(
    private fb: FormBuilder,
    private readonly usersService: UsersService,
    private readonly sharedService: SharedService,
    private readonly projectService: ProjectsService,
    private router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      label: [null, [Validators.required]],
      assignee: [null, [Validators.required]],
    });

    this.projectService
      .FindOne(+this.route.snapshot.paramMap.get('idProject'))
      .subscribe(
        (r) => {
          this.project = r;
          this.usersService.findAll().subscribe(
            (r) => {
              this.users = r;
              this.assignee = this.users.find(
                (user) => user.id === this.project.assigneeId
              );
              this.isLoading = false;
            },
            () => {
              this.sharedService.ShowErrorNotification();
            }
          );
        },
        () => this.sharedService.ShowErrorNotification()
      );
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      (this.project.label = this.validateForm.value.label),
        (this.project.assigneeId = this.validateForm.value.assignee.id),
        this.projectService.Update(this.project).subscribe(() => {
          this.router.navigateByUrl('projects');
        });
    }
  }
}
