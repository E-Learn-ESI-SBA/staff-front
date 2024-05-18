import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GradesSchema, TGradesForm } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "@radix-ui/react-icons";
import { useFieldArray, useForm } from "react-hook-form";
import { useQuizFormStore } from "@/store/forms/quiz/quiz.store";
import { TypographyP } from "@/components/ui/typography";

const defaultValues2 = {
  grades: [
    {
      min: 80,
      max: 100,
      grade: "A",
    },
    {
      min: 50,
      max: 80,
      grade: "B",
    },
    {
      min: 0,
      max: 50,
      grade: "F",
    },
  ],
};

export default function GradesForm({defaultValues} :any) {
  const { nextStep, setSecondStepContent, second_step_content, prevStep } =
  useQuizFormStore((state) => ({
      nextStep: state.nextStep,
      prevStep: state.prevStep,
      setSecondStepContent: state.setSecondStepContent,
      second_step_content: state.second_step_content ?? defaultValues,
    }));
    console.log('sdsd',second_step_content)
  const form = useForm<TGradesForm>({
    resolver: zodResolver(GradesSchema),
    defaultValues: second_step_content ?? defaultValues2 ,
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    name: "grades",
    control: form.control,
  });
  const submitHandler = (data: TGradesForm) => {
    setSecondStepContent(data);
    nextStep();
  };
  return (
    <Form {...form}>
      <form
        className="space-y-8 py-4"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <div className="flex justify-between items-center font-medium">
          <div className="flex gap-4 w-2/5">
            <p>Minimum Marks</p>
          </div>
          <div className="flex gap-4 w-2/5">
            <p>Grade</p>
          </div>
          <div className="flex gap-4 w-1/5">
            <p>Delete</p>
          </div>
        </div>

        {fields.map((field, index) => (
          <div
            className="flex justify-between items-start gap-2"
            key={field.id}
          >
            <div className="flex gap-4 w-2/5">
              <FormField
                control={form.control}
                name={`grades.${index}.min`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="bg-[#F1F1F1]"
                        type="number"
                        {...field}
                        placeholder="Min mark"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`grades.${index}.max`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="bg-[#F1F1F1] "
                        type="number"
                        {...field}
                        placeholder="Max mark"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4 w-2/5">
              <FormField
                control={form.control}
                name={`grades.${index}.grade`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="bg-[#F1F1F1] "
                        type="text"
                        {...field}
                        placeholder="Grade Value"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4 w-1/5">
              <Button
                disabled={fields.length === 0}
                variant="outline"
                size="sm"
                className="w-fit p-2"
                onClick={() => {
                  remove(index);
                }}
              >
                <TrashIcon className="text-red-700" />
              </Button>
            </div>
          </div>
        ))}
        <Button
          disabled={fields.length > 5}
          type="button"
          variant="outline"
          size="sm"
          className="mt-2 rounded-xl border border-[#0066FF] text-[#0066FF] px-8 py-2 "
          onClick={() => {
            if (fields.length <= 5)
              append({
            //@ts-ignore
                min: null,
            //@ts-ignore
                max: null,
                grade: "",
                // note: "",
              });
          }}
        >
          Add more grade
        </Button>

        {form.formState?.errors && (
          <TypographyP className=" indent-6 text-red-600 my-5 text-sm">
            {form.formState.errors.grades?.root?.message}
          </TypographyP>
        )}

        <div className="flex justify-between items-center gap-8">
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
              console.log(form.formState.errors);
            }}
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
