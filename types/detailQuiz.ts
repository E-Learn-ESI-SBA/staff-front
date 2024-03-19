type Answer = {
    id: number;
    text: string;
  };
  
  export type Question  = {
    id: number;
    questionText: string;
    answers: Answer[];
    correctAnswerId: number;
    selectedAnswerId?: number | null;
  };
  
  export default interface Quiz  {
    questions: Question[];
  };