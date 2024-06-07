export interface IQuiz {
  id: string;
  title: string;
  description?: string;
  duration: number;
  start_date: string;
  end_date: string;
  year : string;
  question_count : string;
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
