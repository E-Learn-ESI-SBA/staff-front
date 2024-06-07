import { Calendar } from "lucide-react";
import Image from "next/image";
interface QuizDetailsProps {
  title: string;
  passed: boolean;
  date: string;
  subject: string;
  numberOfQuestions: number;
  score: number;
  grade: string;
}

const QuizDetails: React.FC<QuizDetailsProps> = ({
  title,
  passed,
  date,
  subject,
  numberOfQuestions,
  score,
  grade,
}) => {
  return (
    <>
      <div className="flex items-center justify-start gap-4">
        <p className='font-medium' >{title}</p>
        <p
          className={` px-2 py-1 rounded-[10px] ${passed ? "text-[#0F930F] bg-[#d8eed8]" : "bg-[#FE5C73] text-[#DD3A3A]"} `}
        >
          Status : {passed ? "passed" : "failed"}
        </p>
      </div>
      <div className="flex items-center justify-start gap-4">
        <p className="font-medium">Quiz Schedule</p>
        <div className=" bg-[#ededf5] px-2 py-1 rounded-[10px] flex justify-between items-center gap-2 ">
          <Calendar className="w-4 h-4" />
          <p className="text-sm font-light">{date} </p>
        </div>
      </div>
      <div className="flex items-center justify-start gap-4">
        <p className="font-medium">Subject : </p>
        <p>{subject} </p>
      </div>
      <div className="flex items-center justify-start gap-4">
        <p className="font-medium">Number of Questions : </p>
        <p>{numberOfQuestions} </p>
      </div>
      <div className="flex items-center justify-start gap-4">
        <p className="font-medium">Score : </p>
        <p> {score} </p>
      </div>
        <div className="flex items-center justify-start gap-4">
        <p className="font-medium">Grade : </p>
        <p> {grade} </p>
      </div>
    </>
  );
};

export default QuizDetails;
