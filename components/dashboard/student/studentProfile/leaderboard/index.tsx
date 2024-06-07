"use client";
import { useState } from "react";
import Card from "./card";
import Ranking from "@/types/rank";

type Props = {
  dailyStudents: Ranking[];
  weeklyStudents: Ranking[];
}
const LeaderBoard = ({dailyStudents, weeklyStudents}:Props) => {
  const [selectedButton, setSelectedButton] = useState(true);

  const handleToggle = () => {
    setSelectedButton((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col gap-8 px-8">
      <div className="mx-auto shadow rounded-2xl border h-12 mt-4 flex py-2 px-2 sm:px-8  w-fit relative items-center bg-[#0066FF] text-white">
        <button
          onClick={handleToggle}
          className={`w-full flex justify-center rounded-2xl py-1 px-2 sm:px-8 translate-x-1 transition-all ${
            selectedButton ? "bg-white text-blue-500" : "text-white"
          }`}
        >
          Daily
        </button>
        <button
          onClick={handleToggle}
          className={`w-full flex justify-center rounded-2xl py-1 px-2 sm:px-8 translate-x-1 transition-all ${
            !selectedButton ? "bg-white text-blue-500" : "text-white"
          }`}
        >
          Monthly
        </button>
      </div>

      {selectedButton ? (
        <div className="flex flex-col gap-2">
          {" "}
          {dailyStudents.map((student, index) => (
            <Card key={index} student={student} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {weeklyStudents.map((student, index) => (
            <Card key={index} student={student} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
