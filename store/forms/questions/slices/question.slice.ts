import {
	TQCMForm,
	TExamSchema,
	TGradesForm,
} from '@/types/zod';
import { StateCreator } from 'zustand';

interface IQstSlice {
	// selectedForm: EQuestionType;
	currentStep: number;
	// question_content: TFirstStepSchema | null;
	first_step_content: TExamSchema | null;
	second_step_content: TGradesForm | null;
	third_step_content: TQCMForm | null;
	// question_metadata: TQROCForm | TQCMForm | TSortForm | TDnDForm | null;
	// setQstContent: (content: TFirstStepSchema) => void;
	setFirstStepContent: (content: TExamSchema) => void;
	setSecondStepContent: (content: TGradesForm) => void;
	setThirdStepContent: (content: TQCMForm) => void;
	// setQstMetadata: (
	// 	metadata: TQROCForm | TQCMForm | TSortForm | TDnDForm
	// ) => void;
	// currentFile: File | null;
	cleanUp: () => void;
	nextStep: () => void;
	prevStep: () => void;
	// setCurrentFile: (file: File | null) => void;
	setInitialValues: (
		firstStep: TExamSchema ,
		secondStep: TGradesForm ,
		thirdStep: TQCMForm ,
		// secondStep: {
		// 	qcm: TQCMForm | null;
		// 	qroc: TQROCForm | null;
		// 	sort: TSortForm | null;
		// 	dragAndDrop: TDnDForm | null;
		// }
	) => void;
	// setSelectedForm: (selectedForm: EQuestionType) => void;
}

const questionContentInitialState = null;
const firstStepContentInitialState = null;
const secondStepContentInitialState = null;
const thirdStepContentInitialState = null;
const qstSlice: StateCreator<IQstSlice> = (set, get) => ({
	// selectedForm: EQuestionType.QCM,
	currentStep: 1,
	// question_content: questionContentInitialState,
	first_step_content: firstStepContentInitialState,
	second_step_content: secondStepContentInitialState,
	third_step_content: thirdStepContentInitialState,
	question_metadata: null,
	// setQstContent: (question_content) => set({ question_content }),
	setFirstStepContent: (first_step_content) => set({ first_step_content }),
	setSecondStepContent: (second_step_content) => set({ second_step_content }),
	setThirdStepContent: (third_step_content) => set({ third_step_content }),
	// setQstMetadata: (question_metadata) => set({ question_metadata }),
	// currentFile: null,
	// setSelectedForm: (selectedForm) => set({ selectedForm }),
	// setCurrentFile: (currentFile) => set({ currentFile }),
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
	setInitialValues: (firstStep, secondStep,thirdStep) => {
		set((state) => ({
			...state,
			// question_content: firstStep,
			first_step_content: firstStep,
			second_step_content: secondStep,
			third_step_content: thirdStep,
			// question_metadata:
			// 	secondStep.qcm ||
			// 	secondStep.qroc ||
			// 	secondStep.sort ||
			// 	secondStep.dragAndDrop,
			// selectedForm: firstStep.qst_type,
		}));
	},
	cleanUp: () => {
		// complete
		set((state) => ({
			...state,
			question_content: questionContentInitialState,
			first_step_content: firstStepContentInitialState,
			second_step_content: secondStepContentInitialState,
			third_step_content: thirdStepContentInitialState,
			// question_metadata: null,
			// currentFile: null,
		}));
	},
});
export type { IQstSlice };
export { qstSlice };
