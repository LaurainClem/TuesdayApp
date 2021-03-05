import { ExigenceModel } from './exigence.model';
import { UserModel } from './user.model';

export class TaskModel {
  id: number;
  label: string;
  description: string;
  assigneeId: number;
  exigences: ExigenceModel[];
  plannedStartDate: Date;
  plannedEndDate: Date;
  realStartDate: Date;
  realEndDate: Date;
  cost: number;
  requiredTask: TaskModel;
  assignee: UserModel;
  status: 'done' | 'progress' | 'waiting';
}
