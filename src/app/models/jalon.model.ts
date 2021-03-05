import { TaskModel } from './task.model';
import { UserModel } from './user.model';

export class JalonModel {
  id?: number;
  label: string;
  plannedStartDate: Date;
  plannedEndDate: Date;
  realStartDate: Date;
  realEndDate: Date;
  assigneeId: number;
  assignee: UserModel;
  tasks: TaskModel[];
}
