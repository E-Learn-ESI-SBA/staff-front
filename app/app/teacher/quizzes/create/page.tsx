"use client";
import QuizFirstStepForm from "@/components/dashboard/Quiz/create/first-step";
import Preview from "@/components/dashboard/Quiz/create/fourth-step";
import GradesForm from "@/components/dashboard/Quiz/create/second-step";
import QCMForm from "@/components/dashboard/Quiz/create/third-step";
import { useQuizFormStore } from "@/store/forms/quiz/quiz.store";

export default function CreateQuiz() {
  const { currentStep } = useQuizFormStore((state) => ({
    currentStep: state.currentStep,
  }));
  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <p className="text-2xl text-[#434343] font-medium ">Create New Quiz</p>
      </div>
      <div className="flex flex-col">
        {currentStep === 1 && <QuizFirstStepForm />}
        {currentStep === 2 && <GradesForm />}
        {currentStep === 3 && <QCMForm />}
        {currentStep === 4 && <Preview />}
      </div>
    </div>
  );
}
