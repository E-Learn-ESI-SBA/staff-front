export interface IAssignment {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  module_name: string;
  publisher: string;
  files ?: string[];
  state: AssignmentState;
  marks ?: number;
  type : AssignmentType;
}
export enum AssignmentState {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  FINISHED = "FINISHED",
}
export enum AssignmentType {
  MANUAL = "manual",
  AUTOMATED = "automated",
}

