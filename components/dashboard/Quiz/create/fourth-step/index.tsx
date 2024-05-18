import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQuizFormStore } from "@/store/forms/quiz/quiz.store";

export default function Preview() {
  const {
    prevStep,
    first_step_content,
    second_step_content,
    third_step_content,
  } = useQuizFormStore((state) => ({
    nextStep: state.nextStep,
    prevStep: state.prevStep,
    first_step_content: state.first_step_content,
    second_step_content: state.second_step_content,
    third_step_content: state.third_step_content,
  }));

  const submit = () => {
    console.log("Submitted form");
    console.log("step1", first_step_content);
    console.log("step2", second_step_content);
    console.log("step3", third_step_content);
  };
  return (
    <div className="p-2">
      <p className="text-2xl my-8 font-medium text-center">Preview Questions</p>
      {third_step_content.questions.map((question, index) => (
        <div key={index} className="flex flex-col my-8 gap-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">Q{index + 1}.</p>
          </div>
          <p className="font-medium text-xl">{question.qst_title}</p>
          {question.qst_image && (
            <Image
              src={question.qst_image}
              alt={question.qst_title}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full max-w-96 h-64"
            />
          )}
          <ul className="flex flex-col gap-4 text-medium">
            {question.answers.map((answer, i) => (
              <li
                key={i}
                className={`flex justify-between items-center p-2 border-b-2 border-[#EFEFEF] ${answer.validite ? "" : "text-[#8A8A8A]"}`}
              >
                <p>
                  <span>{i + 1}. </span>
                  <span>{answer.title}</span>
                </p>
                {answer.validite && (
                  <div className="px-4 py-2 rounded-lg text-[#2E8760] bg-[#E9FFF5]">
                    Marked as Correct
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="flex justify-between items-center pr-4">
        <Button
          className="w-fit py-2 px-6"
          onClick={() => {
            prevStep();
          }}
        >
          Previous
        </Button>
        <Button
          className="w-fit py-2 px-6"
          type="submit"
          onClick={() => {
            submit();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
