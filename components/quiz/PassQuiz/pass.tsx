//@ts-nocheck
"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import {MATERIAL_BASE_URL } from "@/config/constants";
import { useUserStore } from "@/store/user";
import { usePathname,useRouter } from "next/navigation";
import { toast } from "sonner";
export default function PassQuiz({quizData} : {quizData :any } ) {
  const { user } = useUserStore()
  const [answers, setAnswers] = useState(
    quizData.questions.map((question) => ({
      question_id: question.id, 
      choices: []
    }))
  );
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizData.duration * 60);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleOptionChange = (questionIndex, optionId) => {
    const newAnswers = [...answers];
    const currentChoices = newAnswers[questionIndex].choices;
    if (currentChoices.includes(optionId)) {
      newAnswers[questionIndex].choices = currentChoices.filter(choice => choice !== optionId);
    } else {
      newAnswers[questionIndex].choices = [...currentChoices, optionId];
    }
    setAnswers(newAnswers);
  };


  const router = usePathname()
  const routerr = useRouter()
  const pathParts = router.split("/");
  const id = pathParts[pathParts.length - 2];

  const handleSubmit = async () => {
    const submission = {
      quizId: quizData.id,        
      answers: answers,
    };
    try {
      const response = await fetch(`${MATERIAL_BASE_URL}/quizes/${id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.accessToken}`
        },
        body: JSON.stringify(submission)
      });

      if (response.ok) {
        console.log("Quiz submitted successfully");
        toast.success("Quiz submitted successfully")

      } else {
        console.error("Failed to submit quiz");
        toast.error("something went wrong")
      }
      setTimeout(() => {
        routerr.replace("/app/student");
      }, 1500);

    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("something went wrong")
      setTimeout(() => {
        routerr.replace("/app/student");
      }, 1500);
    }
  };

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

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'i know it is going to be ovverided by browser'; 
    };

    const handleUnload = () => {
      handleSubmit();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
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
                <p className="text-lg font-medium">Time is Up!</p>
                <p>The quiz has ended. Your answers have been submitted.</p>
              </div>
              <Link href='/' className="rounded-md px-4 py-1 bg-blue-500 self-end text-white">
                Finish      
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center font-medium">
        <p className="text-3xl font-medium text-[#2B3674] "> {quizData.title}  </p>
        <p className={` fixed right-2 text-2xl ${timeLeft <= quizData.duration * 12 && 'text-red-500'} `}>Timer : <span>{formatTime(timeLeft)}</span></p>
      </div>
      {quizData.questions.map((question, index) => (
        <div key={index} className="flex flex-col my-8 gap-4">
          <div className={`flex flex-col gap-4 `}>
            <div className="flex flex-col gap-4 lg:w-1/2 text-[#4E5566]"> 
              <div className="text-2xl font-medium flex justify-between items-center">
                <p>Question {index + 1}/{quizData.questions.length}</p>
                <p> score : <span> {question.score}</span> </p>
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
            {question.options.map((option,i) => (
              <li
                key={option.id}
                className={`rounded-xl p-2 border-2 border-[#DADADA] cursor-pointer ${
                  answers[index].choices.includes(option.id) ? 'bg-blue-200' : ''
                }`}
                onClick={() => handleOptionChange(index, option.id)}
              >
                {i+1}. {option.option}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Button onClick={handleSubmit} className="mt-4">Submit Quiz</Button>
    </div>
  );
}
