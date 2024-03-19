import { useSearchParams } from "next/navigation";

export function QuizAnswering() {
  const searchParam = useSearchParams();
  const currentQuestion = searchParam.get("question");
  return <div></div>;
}
