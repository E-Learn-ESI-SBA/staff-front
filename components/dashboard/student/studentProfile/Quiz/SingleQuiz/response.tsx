//@ts-nocheck
interface Props {
  data: any;
}

const Response: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      {data.quiz.questions.map((question, index) => {
        const submissionAnswer = data.submission.answers.find(
          (answer) => answer.question_id === question.id
        );

        return (
          <div key={index} className="flex flex-col gap-2 items-start">
                        <p className="font-medium text-lg"> {`Q${index + 1}.`} {question.body}</p>
            <div className="flex justify-start items-center gap-8" >
            <p className="font-semibold text-lg">
               {submissionAnswer?.is_correct ? "(Correct)" : "(Incorrect)"}
            </p>
            <p className="font-semibold text-lg" >{question.score} points</p>
              </div>
            <ul className="flex flex-col gap-2 min-w-[250px] w-2/3 lg:w-1/2">
              {question.options.map((option,i) => {
                const isCorrect = question.correct_idxs.includes(option.id);
                const isSelected = submissionAnswer?.choices.includes(option.id);
                const borderClass = isSelected
                  ? isCorrect
                    ? "border-[#0CC818] bg-[#EFFFF0]"
                    : "bg-[#FE5C73] border-[#DD3A3A]"
                  : isCorrect
                  ? "border-[#0CC818] bg-[#EFFFF0]"
                  : "border-[#DADADA]";

                return (
                  <li
                    key={option.id}
                    className={`rounded-xl p-2 border-2 ${borderClass}`}
                  >
                    {i+1}. {option.option}
                    {isSelected && <span className="ml-2">(Selected)</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Response;
