import { IQuiz } from "@/types/quiz";
import { QuizDetails } from "@/components/quiz/details/common";
import { Button } from "@/components/ui/button";

type Props = {
  quiz: IQuiz;
};
export function StudentQuizOverview({ quiz }: Props) {
  return (
    <QuizDetails {...quiz}>
      <div className="mt-12 w-fit self-end">
        <Button className="border-lg px-4" size="lg">
          Start
        </Button>
      </div>
    </QuizDetails>
  );
}
