export interface IAssignment {
  id: string;
  title: string;
  description: string;
  deadline: string;
  module_id: string;
  module?:string;
  teacher_id: string;
  teacher:string;
  file: string;
  year: string;
  grade?: Number;
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
