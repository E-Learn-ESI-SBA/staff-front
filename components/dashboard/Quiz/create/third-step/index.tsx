import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TypographyP } from "@/components/ui/typography";
import { useQuizFormStore } from "@/store/forms/quiz/quiz.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "@radix-ui/react-icons";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import Questions from "./questions";
import convertObject from '@/utils/convertObjects'
const QCMSchema = z.object({
  questions: z
    .array(
      z.object({
        body: z.string().min(3, "Question announcement is required"),
        score: z.coerce
        .number()
        .min(1, { message: "must be at least 1 point" })
        .default(30),
        image: z.string().default("").optional(),
        file : z.any(),
        options: z
          .array(
            z.object({
              option: z.string().min(3, "Answer is required"),
              validity: z.boolean().default(false),
              id : z.string(),
            }),
          )
          .min(3, "At least 3 answers must be provided")
          .refine((val) => {
            return val.filter((item) => item.validity).length > 0;
          }, "At least one answer must be selected"),
      }),
    )
    .min(3, "At least 3 questions must be provided"),
});

type TQCMForm = z.infer<typeof QCMSchema>;

const defaultValues = {
  questions: [
    {
      body : "question1",
      score : 10,
      image: "",
      file : null,
      options: [
        { option: "answer1", validity: false , id : null },
        { option: "answer2", validity: true , id : null},
        { option: "answer3", validity: false  , id : null},
      ],
    },
    {
      body: "question2",
      score : 10,
      image: "",
      file : null,
      options: [
        { option: "answer1", validity: false , id : null},
        { option: "answer2", validity: true , id : null},
        { option: "answer3", validity: false  , id : null},
      ],
    },
    {
      body: "question3",
      score : 10,
      image: "",
      file : null,
      options: [
        { option: "answer1", validity: false , id : null },
        { option: "answer2", validity: true , id : null},
        { option: "answer3", validity: false , id : null},
      ],
    },
  ],
};


const defaultValues2 = {
  questions: [
    {
      body: "question1",
      score: 10,
      image: "",
      file: null,
      options: [
        {
          option: "answer1",
          id: "120"
        },
        {
          option: "answer2",
          id: "128"
        },
        {
          option: "answer3",
          id: "129"
        }
      ],
      correct_Idx: [
        "128",
        "129"
      ]
    },
    {
      body: "question2",
      score: 10,
      image: "",
      file: null,
      options: [
        {
          option: "answer1",
          id: "5"
        },
        {
          option: "answer2",
          id: "1"
        },
        {
          option: "answer3",
          id: "9"
        }
      ],
      correct_Idx: [
        "5",
        "1"
      ]
    },
    {
      body: "question3",
      score: 10,
      image: "",
      file: null,
      options: [
        {
          option: "answer1",
          id: "21"
        },
        {
          option: "answer2",
          id: "22"
        },
        {
          option: "answer3",
          id: "23"
        }
      ],
      correct_Idx: [
        "21",
        "23"
      ]
    }
  ]
};

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
    console.log('data',data)
  const updatedData = convertObject(data,1)
  console.log('ii',updatedData)
  
  setThirdStepContent(updatedData);
    nextStep();
  };
  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  console.log('erros',form.formState?.errors.questions)

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
