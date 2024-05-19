import { QuizTable } from "@/components/quiz/table";
import Link from "next/link";
const Quizzes = () => {
  return (
    <div className="flex flex-col gap-8 p-4">
      <Link
        href="/app/teacher/quizzes/create"
        className="px-4 py-2 text-white bg-[#2C62EE] self-end rounded-lg  "
      >
        + Add Quiz
      </Link>
      <QuizTable />;
    </div>
  );
};
export default Quizzes;
