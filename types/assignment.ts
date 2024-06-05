export interface IAssignment {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  module_name: string;
  publisher: string;
  files?: string[];
  state: AssignmentState;
  marks?: number;
  type: AssignmentType;
}

export interface Submission {
  id: string;
  file: string;
  grade: Number;
  feedback: string;
  assignment_id: string;
  assignment:string;
  student_id: string;
  student:string;
  EvaluatedAt: string;

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