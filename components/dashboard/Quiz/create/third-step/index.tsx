import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TypographyP } from "@/components/ui/typography";
import { useQuizFormStore } from "@/store/forms/quiz/quiz.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "@radix-ui/react-icons";
import { useFieldArray, useForm } from "react-hook-form";
import Questions from "./questions";
import convertObject from '@/utils/convertObjects'
import { defaultValues2 } from "@/static/dummy-data/quiz/details";
import { TQCMForm,QCMSchema } from "@/types/zod";
export default function QCMForm() {
  const { nextStep, third_step_content, setThirdStepContent, prevStep } =
    useQuizFormStore((state) => ({
      nextStep: state.nextStep,
      prevStep: state.prevStep,
      setThirdStepContent: state.setThirdStepContent,
      third_step_content: state.third_step_content ?? convertObject(defaultValues2,2) ,
    }));

  const form = useForm<TQCMForm>({
    resolver: zodResolver(QCMSchema),
    defaultValues: third_step_content,
    mode: "onChange",
  });


  const onSubmit = (data:any) => {
  const updatedData = convertObject(data,1)
  setThirdStepContent(updatedData);
    nextStep();
  };
  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  return (
    <Form {...form}>
      <form className="py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <TypographyP>
          Create a question with multiple choices.
          <br />
          Note that the selected choices will be the correct answers.
        </TypographyP>
        {fields.map((item, index) => {
          return (
            <div
              key={item.id}
              className="flex justify-start items-start gap-4 my-4"
            >
              <Questions form={form} index={index} />
              <Button variant="outline" size="sm" onClick={() => remove(index)}>
                <TrashIcon className="text-red-700" />
              </Button>
            </div>
          );
        })}
        <button
          className="bg-[#F3F6FF] text-[#3D70F5] rounded-lg my-8 py-2 px-4"
          type="button"
          onClick={() => {
            //@ts-ignore
            append({body: ""});
          }}
        >
          + add question
        </button>
        <div className="flex justify-between items-center pr-4">
          <Button
            className="w-fit py-2 px-6"
            onClick={() => {
              prevStep();
            }}
          >
            Previous
          </Button>
          <Button type="submit" className="w-fit py-2 px-6">
            Next
          </Button>
        </div>
        {form.formState?.errors.questions && (
          <TypographyP className=" indent-6 text-red-600 my-5 text-sm">
           {form.formState.errors.questions?.root?.message}
          </TypographyP>
        )}
      </form>
    </Form>
  );
}
