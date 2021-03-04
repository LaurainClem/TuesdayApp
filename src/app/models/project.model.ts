import { ExigenceModel } from './exigence.model';
import { TaskModel } from './task.model';
import { UserModel } from './user.model';

export class ProjectModel {
  id?: number;
  label: string;
  assigneeId: number;
  plannedStartDate: any;
  plannedEndDate: any;
  realStartDate: any;
  realEndDate: any;
  assignee: UserModel;
  status: 'done' | 'progress';
  percent: number;
}
