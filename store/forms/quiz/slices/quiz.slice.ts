import { TQCMForm, TExamSchema, TGradesForm } from "@/types/zod";
import { StateCreator } from "zustand";

interface IQuizSlice {
  currentStep: number;
  first_step_content: TExamSchema | null;
  second_step_content: TGradesForm | null;
  third_step_content: TQCMForm | null;
  setFirstStepContent: (content: TExamSchema) => void;
  setSecondStepContent: (content: TGradesForm) => void;
  setThirdStepContent: (content: TQCMForm) => void;
  cleanUp: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setInitialValues: (
    firstStep: TExamSchema,
    secondStep: TGradesForm,
    thirdStep: TQCMForm,
  ) => void;
}

const questionContentInitialState = null;
const firstStepContentInitialState = null;
const secondStepContentInitialState = null;
const thirdStepContentInitialState = null;
const quizSlice: StateCreator<IQuizSlice> = (set, get) => ({
  currentStep: 1,
  first_step_content: firstStepContentInitialState,
  second_step_content: secondStepContentInitialState,
  third_step_content: thirdStepContentInitialState,
  question_metadata: null,
  setFirstStepContent: (first_step_content) => set({ first_step_content }),
  setSecondStepContent: (second_step_content) => set({ second_step_content }),
  setThirdStepContent: (third_step_content) => set({ third_step_content }),
  nextStep: () => {
    set((state) => {
      if (state.currentStep >= 4) return state;
      return { ...state, currentStep: state.currentStep + 1 };
    });
  },

  prevStep: () => {
    set((state) => {
      if (state.currentStep <= 1) return state;
      return { ...state, currentStep: state.currentStep - 1 };
    });
  },
  setInitialValues: (firstStep, secondStep, thirdStep) => {
    set((state) => ({
      ...state,
      first_step_content: firstStep,
      second_step_content: secondStep,
      third_step_content: thirdStep,
    }));
  },
  cleanUp: () => {
    set((state) => ({
      ...state,
      question_content: questionContentInitialState,
      first_step_content: firstStepContentInitialState,
      second_step_content: secondStepContentInitialState,
      third_step_content: thirdStepContentInitialState,
    }));
  },
});
export type { IQuizSlice };
export { quizSlice };
