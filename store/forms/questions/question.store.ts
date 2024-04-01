import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IQstSlice, qstSlice } from "./slices/question.slice";

export const useQuestionFormStore = create<IQstSlice>()(
  devtools((...a) => ({
    ...qstSlice(...a),
  })),
);
