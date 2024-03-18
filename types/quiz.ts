export interface IQuiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  image: string;
  start: string;
  end: string;
  questions: number;
  module_name: string;
  publisher: string;
  state: QuizState;
}
export enum QuizState {
    UPCOMING = "UPCOMING",
    ONGOING = "ONGOING",
    FINISHED = "FINISHED",
}