export interface IQuiz {
  id: string;
  quiz_id ?: string;
  title: string;
  description?: string;
  duration: number;
  start_date: string;
  end_date: string;
  year : string;
  question_count : string;
}
export interface ISubmission {
  id: string;
  student_id : string;
  quiz_id: string;
  description?: string;
  grade: number;
  score: string;
  created_at: string;
  answers : any;
  is_passed: string;
}
export enum QuizState {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  FINISHED = "FINISHED",
}

export interface IQuestion {
  id: string;
  question: string;
  description: string;
}
