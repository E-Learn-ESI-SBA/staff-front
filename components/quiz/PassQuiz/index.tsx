import React from "react";
import Image from "next/image";
import Link from "next/link";

const data = {
  title: "Web Quiz",
  image: "/courses/card-pic.png",
  start_date: "2024-05-15",
  end_date: "2024-05-31",
  duration: "30 min",
  attempts: 1,
  highest: 200,
  pass: 100,
  passed: false,
  instructions:
    "This quiz consists of 5 multiple-choice questions. To be successful with the quizzes, it's important to conversant with the topics. Keep the following in mind:Timing - You need to complete each of your attempts in one sitting, as you are allotted 30 minutes to each attempt.Answers - You may review your answer-choices and compare them to the correct answers after your final attempt.To start, click the Start button. When finished, click the Submit button.",
};

const PreQuiz = () => {
  return (
    <div className="flex flex-col gap-8 text-[#4E5566] p-8">
      <h1 className="text-3xl font-medium text-[#2B3674] "> {data.title}</h1>
      <p>Read the following informations</p>
      <div className="flex items-start justify-start gap-8">
        <Image
          src={data.image}
          alt="Quiz image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-1/2 max-h-96"
        />
        <ul className="w-1/2 flex flex-col gap-8">
          <li>
            {" "}
            <span className="font-semibold">start date</span> :{" "}
            {data.start_date}{" "}
          </li>
          <li>
            {" "}
            <span className="font-semibold">end date</span> : {data.end_date}{" "}
          </li>
          <li>
            {" "}
            <span className="font-semibold">duration</span> : {data.end_date}{" "}
          </li>
          <li>
            {" "}
            <span className="font-semibold">Attempts</span> : {data.attempts}{" "}
          </li>
          <li>
            {" "}
            <span className="font-semibold">highest value</span> :{" "}
            {data.highest} points{" "}
          </li>
          <li>
            {" "}
            <span className="font-semibold">pass value</span> : {data.pass}{" "}
            points{" "}
          </li>
        </ul>
      </div>
      <h1 className="font-semibold text-2xl"> Instructions</h1>
      <p>{data.instructions}</p>
      {data.passed ? (
        <p className="max-w-[15ch] text-red-500">
          you have passed this quiz before
        </p>
      ) : (
        <Link
          href="/"
          className="rounded-3xl bg-[#0066FF] px-6 py-4 flex justify-center items-center text-white w-64 self-end "
        >
          Start
        </Link>
      )}
    </div>
  );
};

export default PreQuiz;
