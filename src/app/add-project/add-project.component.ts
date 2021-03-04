import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { ProjectsService } from '../services/projects.service';
import { SharedService } from '../services/shared.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  validateForm!: FormGroup;
  users: UserModel[] = [];
  assignee: UserModel;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private readonly usersService: UsersService,
    private readonly sharedService: SharedService,
    private readonly projectService: ProjectsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      label: [null, [Validators.required]],
      assignee: [null, [Validators.required]],
    });

    this.usersService.findAll().subscribe(
      (r) => {
        this.users = r;
        this.assignee = this.users[0];
        this.isLoading = false;
      },
      () => {
        this.sharedService.ShowErrorNotification();
      }
    );
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      const project = {
        label: this.validateForm.value.label,
        assignee: this.validateForm.value.assignee,
      };
      this.projectService.Add(project).subscribe(() => {
        this.router.navigateByUrl('projects');
      });
    }
  }
}
