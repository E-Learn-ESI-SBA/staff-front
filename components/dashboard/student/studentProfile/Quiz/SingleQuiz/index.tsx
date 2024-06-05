"use client";
import { useState } from "react";
import QuizDetails from "./details";
import Response from "./response";
import { questions } from "@/static/content/Quiz";

const SingleQuiz = ({data} :{data : any} ) => {
  console.log('ez',data)
  const [selectedButton, setSelectedButton] = useState(true);

  const handleToggle = () => {
    setSelectedButton((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col gap-4 p-8">
      <p className="bg-[#ECF2FF] text-[#3D70F5] p-2 rounded-lg text-xs w-fit self-end">
        Result Declared on {data.quiz?.end_date.slice(0,10)}
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
          title={data.quiz.title}
          passed={data.submission.is_passed}
          date={data.quiz?.start_date.slice(0,10)}
          subject={data.module_name}
          numberOfQuestions={data.quiz.questions.length}
          correctAnswers={35}
          grade={data.submission.grade}
        />
      ) : (
        <Response data={data} />
      )}
    </div>
  );
};

export default SingleQuiz;
