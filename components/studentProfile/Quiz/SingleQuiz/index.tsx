"use client";
import { useState } from "react";
import QuizDetails from "./details";
import Response from "./response";
import { questions } from "@/static/content/Quiz";

const SingleQuiz: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState(true);

  const handleToggle = () => {
    setSelectedButton((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col gap-4 p-8">
      <p className="bg-[#ECF2FF] text-[#3D70F5] p-2 rounded-lg text-xs w-fit self-end">
        Result Declared on 12:30 AM | 22 September 2023
      </p>
      <p className="text-xl font-medium">Quiz Result Details</p>

      <div className="self-start my-8 inline-flex items-center rounded-lg bg-[#EEEFF9] text-[#7E7E7E]">
        <button
          onClick={handleToggle}
          className={`py-1 px-2 sm:px-16 transition-all ${
            selectedButton ? "bg-[#3D70F5] text-white" : ""
          }`}
        >
          Details
        </button>
        <button
          onClick={handleToggle}
          className={`py-1 px-2 sm:px-16 transition-all ${
            !selectedButton ? "bg-[#3D70F5] text-white" : ""
          }`}
        >
          Response
        </button>
      </div>

      {selectedButton ? (
        <QuizDetails
          title="Articulate structure of C++ and Java in Semester 1"
          passed={true}
          date="12-01-2023"
          subject="Networking"
          numberOfQuestions={50}
          correctAnswers={35}
          percentege={87}
        />
      ) : (
        <Response questions={questions} />
      )}
    </div>
  );
};

export default SingleQuiz;
