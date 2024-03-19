import { Question } from "@/types/detailQuiz";
export const questions: Question[] = [
  {
    id: 1,
    questionText: "Which of the following is not a networking protocol?",
    answers: [
      { id: 1, text: "ICP" },
      { id: 2, text: "DCP" },
      { id: 3, text: "CCP" },
      { id: 4, text: "BCP" },
    ],
    correctAnswerId: 4,
    selectedAnswerId: 1,
  },
  {
    id: 2,
    questionText: "Which of the following is not a networking protocol?",
    answers: [
      { id: 1, text: "ICP" },
      { id: 2, text: "DCP" },
      { id: 3, text: "CCP" },
      { id: 4, text: "BCP" },
    ],
    correctAnswerId: 3,
    selectedAnswerId: 3,
  },
];
