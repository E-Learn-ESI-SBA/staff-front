import { StateCreator } from "zustand";
import { Assignment, File } from "@/types";
interface IAssignmentSlice {
  currentStep: number;
  first_step_content: Assignment | null;
  second_step_content: File[] | null;
  setFirstStepContent: (content: Assignment) => void;
  setSecondStepContent: (content: File[]) => void;
  cleanUp: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setInitialValues: (firstStep: Assignment, secondStep: File[]) => void;
}

const firstStepContentInitialState = null;
const secondStepContentInitialState = null;
const assignmentSlice: StateCreator<IAssignmentSlice> = (set, get) => ({
  currentStep: 1,
  first_step_content: firstStepContentInitialState,
  second_step_content: secondStepContentInitialState,
  setFirstStepContent: (first_step_content) => set({ first_step_content }),
  setSecondStepContent: (second_step_content) => set({ second_step_content }),
  nextStep: () => {
    set((state) => {
      if (state.currentStep >= 2) return state;
      return { ...state, currentStep: state.currentStep + 1 };
    });
  },

  prevStep: () => {
    set((state) => {
      if (state.currentStep <= 1) return state;
      return { ...state, currentStep: state.currentStep - 1 };
    });
  },
  setInitialValues: (firstStep, secondStep) => {
    set((state) => ({
      ...state,
      first_step_content: firstStep,
      second_step_content: secondStep,
    }));
  },
  cleanUp: () => {
    set((state) => ({
      ...state,
      first_step_content: firstStepContentInitialState,
      second_step_content: secondStepContentInitialState,
    }));
  },
});
export type { IAssignmentSlice };
export { assignmentSlice };
