import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { ProjectsComponent } from './projects/projects.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AddProjectComponent } from './add-project/add-project.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ExigencesComponent } from './exigences/exigences.component';
import { AddExigencesComponent } from './add-exigences/add-exigences.component';
import { EditExigencesComponent } from './edit-exigences/edit-exigences.component';
import { TasksComponent } from './tasks/tasks.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    AddProjectComponent,
    EditProjectComponent,
    ExigencesComponent,
    AddExigencesComponent,
    EditExigencesComponent,
    TasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzAvatarModule,
    NzLayoutModule,
    NzProgressModule,
    NzNotificationModule,
    NzIconModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzSelectModule,
    NzToolTipModule,
    NzTagModule,
    NzModalModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }],
  bootstrap: [AppComponent],
})
export class AppModule {}
