import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IAssignmentSlice, assignmentSlice } from "./slices/question.slice";

export const useAssignmentFormStore = create<IAssignmentSlice>()(
  devtools((...a) => ({
    ...assignmentSlice(...a),
  })),
);
