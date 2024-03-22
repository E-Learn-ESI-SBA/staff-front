import { Question } from "@/types/detailQuiz";
const Response: React.FC<{ questions: Question[] }> = ({ questions }) => {
  return (
    <div className="flex flex-col gap-4">
      {questions.map((question, index) => (
        <div key={index} className="flex flex-col gap-2 items-start">
          <p className="font-semibold text-lg">{`Q${index + 1}.`}</p>
          <p className="font-medium text-lg">{question.questionText}</p>
          <ul className="flex flex-col gap-2 min-w-[250px] w-2/3 lg:w-1/2">
            {question.answers.map((answer) => {
              const isCorrect = answer.id === question.correctAnswerId;
              const isSelected = answer.id === question.selectedAnswerId;
              const borderClass = isSelected
                ? isCorrect
                  ? "border-[#0CC818] bg-[#EFFFF0]"
                  : "bg-[#FE5C73] border-[#DD3A3A]"
                : isCorrect
                  ? "border-[#0CC818] bg-[#EFFFF0]"
                  : "border-[#DADADA]";
              return (
                <li
                  key={answer.id}
                  className={`rounded-xl p-2 border-2 ${borderClass}`}
                >
                  {answer.id}. {` `}
                  {answer.text}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Response;
