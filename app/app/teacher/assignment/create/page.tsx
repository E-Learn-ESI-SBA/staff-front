"use client";
import AssignmentFirstStepForm from "@/components/dashboard/Assignment/create/first-step";
import AssignmentSecondStep from "@/components/dashboard/Assignment/create/second-step";
import { useAssignmentFormStore } from "@/store/forms/assignments/question.store";

export default function CreateAssignment() {
  const { currentStep } = useAssignmentFormStore((state) => ({
    currentStep: state.currentStep,
  }));
  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <p className="text-2xl text-[#434343] font-medium ">
          Create New Assignment
        </p>
      </div>
      <div className="flex flex-col">
        {currentStep === 1 && <AssignmentFirstStepForm />}
        {currentStep === 2 && <AssignmentSecondStep />}
      </div>
    </div>
  );
}
