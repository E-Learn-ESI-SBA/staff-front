import { Button } from '@/components/ui/button';
import {
    Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TypographyP } from '@/components/ui/typography';
import { useQuestionFormStore } from '@/store/forms/questions/question.store';
import { zodResolver } from '@hookform/resolvers/zod';
import {TrashIcon } from '@radix-ui/react-icons';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from "zod";
import Questions from './questions';

const QCMSchema = z.object({
    questions: z
        .array(
            z.object({
                qst_title: z.string().min(3, "Question announcement is required"),
                qst_image: z.string().default('').optional(),
                answers: z
                    .array(
                        z.object({
                            title: z.string().min(3, "Answer is required"),
                            validite: z.boolean().default(false),
                        }),
                    )
                    .min(3, "At least 3 answers must be provided")
                    .refine((val) => {
                        return val.filter((item) => item.validite).length > 0;
                    }, "At least one answer must be selected"),
            }),
        )
        .min(3, "At least 3 questions must be provided"),
});

type TQCMForm = z.infer<typeof QCMSchema>;


const  defaultValues = {
  questions: [
    {
      qst_title: "question1",
      qst_image : '',
      answers: [{ title: "answer1", validite: false },
      { title: "answer2", validite: true },
      { title: "answer3", validite: false }
  ]
    },
    {
      qst_title: "question2",
      qst_image : '',
      answers: [{ title: "answer1", validite: false },
      { title: "answer2", validite: true },
      { title: "answer3", validite: false }
  ]
    },
    {
      qst_title: "question3",
      qst_image : '',
      answers: [{ title: "answer1", validite: false },
      { title: "answer2", validite: true },
      { title: "answer3", validite: false }
  ]
    }
  ]
};

export default function QCMForm() {
    const {
		nextStep,
    third_step_content,
    setThirdStepContent,
        prevStep,
	} = useQuestionFormStore((state) => ({
		nextStep: state.nextStep,
        prevStep: state.prevStep,
		setThirdStepContent: state.setThirdStepContent,
		third_step_content: state.third_step_content ?? defaultValues,
	}));
    
    const form = useForm<TQCMForm>({
        resolver: zodResolver(QCMSchema),
        defaultValues : third_step_content ,
        mode: 'onChange',
      });
  
      const onSubmit = (data) => {
        console.log("data", data);
        setThirdStepContent(data)
        nextStep();
      };
      const { fields, append, remove} = useFieldArray({
        name: 'questions',
        control: form.control,
    });

    return (
      <Form {...form}>

        <form className='py-4' onSubmit={form.handleSubmit(onSubmit)} >
                         <TypographyP>
                            Create a question with multiple choices.
                            <br />
                            Note that the selected choices will be the correct answers.
                        </TypographyP>
                             {fields.map((item, index) => {
          return (
            <div key={item.id}   className='flex justify-start items-start gap-4 my-4'   >
          <Questions  form={form} index={index} />
              <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>  remove(index)}
                                    >
                                        <TrashIcon className="text-red-700" />
                                    </Button>
          </div>
          );
        })} 
                <button
      className='bg-[#F3F6FF] text-[#3D70F5] rounded-lg my-8 py-2 px-4'
        type="button"
        onClick={() => {
          append({ qst_title: "" });
        }}
      >
       +  add question
      </button>
          <div className='flex justify-between items-center pr-4' >

      <Button
					className="w-fit py-2 px-6"
					onClick={() => {
						prevStep();
					}}>
					Previous
				</Button>
      <Button
      type='submit'
					className="w-fit py-2 px-6">
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