"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {useState, useEffect, useCallback} from "react";
import { questions } from "@/static/content/Quiz";
import Link from "next/link";

let duration = 5;
let title = "Web Quiz";

type TAnswer = {
    questionId: string;
    choices: string[];
    };

export default function PassQuiz() {
  const [answers, setAnswers] = useState<TAnswer[]>(
    questions.map((question) => ({
      questionId: question.id,
      choices: [],
    })),
  );
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleLeaveConfirmation = () => {
    setIsLeaving(false); // Reset leaving intent
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleOptionChange = (questionIndex:number, optionId: string) => {
    const newAnswers = [...answers];
    const currentChoices = newAnswers[questionIndex].choices;
    if (currentChoices.includes(optionId)) {
      newAnswers[questionIndex].choices = currentChoices.filter(
        (choice) => choice !== optionId,
      );
    } else {
      newAnswers[questionIndex].choices = [...currentChoices, optionId];
    }
    setAnswers(newAnswers);
  };

  const handleSubmit = useCallback(async () => {
    const submission = {
      studentId: "student123",
      quizId: "quiz123",
      answers: answers,
    };

    console.log("sss", submission);

    try {
      const response = await fetch("/api/submit-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer `,
        },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        console.log("Quiz submitted successfully");
      } else {
        console.error("Failed to submit quiz");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  },[answers]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsTimeUpModalOpen(true);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    const handleBeforeUnload = (event: BeforeUnloadEvent ) => {
      event.preventDefault();
      event.returnValue = "i know it is going to be ovverided by browser";
    };

    const handleUnload = () => {
      handleSubmit();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
      clearInterval(timer);
    };
  }, [handleSubmit]);

  return (
    <div className="p-2 relative">
      {isTimeUpModalOpen && (
        <div className="fixed top-4 left-0 right-0 z-50  w-full p-4  max-h-full  ">
          <div className="fixed inset-0 z-40 bg-gray-800 opacity-50"></div>
          <div className="fixed inset-0 z-50 flex justify-center items-center  ">
            <div className="relative bg-white rounded-lg shadow max-w-4xl w-full  h-fit py-8 px-4 flex flex-col">
              <div className="flex flex-col gap-4 font-normal py-4  ">
                <p className="text-lg font-medium">Time{"'"}s Up!</p>
                <p>The quiz has ended. Your answers have been submitted.</p>
              </div>
              <Link
                href="/"
                className="rounded-md px-4 py-1 bg-blue-500 self-end text-white"
              >
                Finish
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center font-medium">
        <p className="text-3xl font-medium text-[#2B3674] "> {title} </p>
        <p
          className={` fixed right-2 text-2xl ${timeLeft <= duration * 12 && "text-red-500"} `}
        >
          Timer : <span>{formatTime(timeLeft)}</span>
        </p>
      </div>
      {questions.map((question, index) => (
        <div key={index} className="flex flex-col my-8 gap-4">
          <div className={`flex flex-col gap-4 `}>
            <div className="flex flex-col gap-4 lg:w-1/2 text-[#4E5566]">
              <div className="text-2xl font-medium flex justify-between items-center">
                <p>
                  Question {index + 1}/{questions.length}
                </p>
                <p>
                  {" "}
                  score : <span> {question.score}</span>{" "}
                </p>
              </div>
              <p className="text-lg max-w-[50ch]">{question.body}</p>
            </div>
            {question.image && (
              <Image
                src={question.image}
                alt={question.body}
                width={0}
                height={0}
                sizes="100vw"
                className="w-1/2 max-h-96"
              />
            )}
          </div>
          <ul className="flex flex-col gap-2 min-w-[250px] w-2/3 lg:w-1/2">
            {question.options.map((option, i) => (
              <li
                key={option.id}
                className={`rounded-xl p-2 border-2 border-[#DADADA] cursor-pointer ${
                  answers[index].choices.includes(option.id)
                    ? "bg-blue-200"
                    : ""
                }`}
                onClick={() => handleOptionChange(index, option.id)}
              >
                {i + 1}. {option.option}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Button onClick={handleSubmit} className="mt-4">
        Submit Quiz
      </Button>
    </div>
  );
}
