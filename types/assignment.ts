export interface IAssignment {
  id: string;
  title: string;
  description: string;
  deadline: string;
  module_id: string;
  file?: string[];
  note?: number;
  teacher_id ?: string;
  year ?: string;
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