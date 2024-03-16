type Answer = {
    id: number;
    text: string;
  };
  
   type Question  = {
    id: number;
    questionText: string;
    answers: Answer[];
    correctAnswerId: number;
    selectedAnswerId?: number | null;
  };
  
  export default interface Quiz  {
    questions: Question[];
  };