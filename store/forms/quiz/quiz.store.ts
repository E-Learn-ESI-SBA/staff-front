import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IQuizSlice, quizSlice } from "./slices/quiz.slice";

export const useQuizFormStore = create<IQuizSlice>()(
  devtools((...a) => ({
    ...quizSlice(...a),
  })),
);
