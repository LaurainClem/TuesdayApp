import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddExigencesComponent } from './add-exigences/add-exigences.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditExigencesComponent } from './edit-exigences/edit-exigences.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ExigencesComponent } from './exigences/exigences.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'projects',
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'projects/new',
    component: AddProjectComponent,
  },
  {
    path: 'projects/:idProject/edit',
    component: EditProjectComponent,
  },
  {
    path: 'projects/:idProject/exigences',
    component: ExigencesComponent,
  },
  {
    path: 'projects/:idProject/exigences/new',
    component: AddExigencesComponent,
  },
  {
    path: 'projects/:idProject/exigences/:idExigence/edit',
    component: EditExigencesComponent,
  },
  {
    path: 'projects/:idProject',
    component: TasksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
