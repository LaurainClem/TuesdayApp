import { UserModel } from './user.model';

export class ProjectModel {
  Id?: number;
  Label: string;
  Assignee: UserModel;
  Status: 'done' | 'progress';
  PlannedStartDate: Date;
  RealStartDate: Date;
}
