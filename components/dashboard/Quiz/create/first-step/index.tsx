"use client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { examSchemaValidator } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Exam } from "@/types";
import { useQuizFormStore } from "@/store/forms/quiz/quiz.store";
import { useState} from "react";
import Image from "next/image";
import { ECourseType } from "@/types";



// const defaultValues = {
//   title: "",
//   instructions: "",
//   quiz_type: undefined,
//   image : "",
//   file : undefined,
//   module_id: undefined,
//   max_score: undefined,
//   min_score : undefined,
//   duration: undefined,
//   question_count: undefined,
//   start_date: undefined,
//   end_date: undefined,
//   id: "",
// };
export default function QuizFirstStepForm({defaultValues} :any) {

  const { first_step_content, nextStep, setFirstStepContent } =
   useQuizFormStore((state) => ({
      nextStep: state.nextStep,
      setFirstStepContent: state.setFirstStepContent,
      first_step_content: state.first_step_content ?? defaultValues,
    }));

  const form = useForm<Exam>({
    resolver: zodResolver(examSchemaValidator),
    defaultValues: first_step_content,
    mode: "onChange",
  });

  console.log('data',first_step_content)

  const [currentImage, setCurrentImage] = useState<string>(
    form.getValues('image') ?? "/assets/person.png",
  );

  const submitHandler = (data: Exam) => {
    setFirstStepContent(data);
    nextStep();
  };
  const years = ['1cp','2cp','1cs','2cs','3cs']
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-8 flex flex-col gap-4  w-full py-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Quiz Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter quiz title here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
  <div className=" relative flex flex-col gap-4 ">
          <Image
            alt="Question Image"
            className=""
            width={150}
            height={100}
            src={currentImage.length > 0 ? currentImage : "/assets/person.png"}
          />
          <Button variant="default" className="relative self-end ">
            Upload Image
            <Input
              className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  form.setValue('file', file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setCurrentImage(reader.result as string);
                    form.setValue(
                      `image`,
                      reader.result as string,
                    );
                  };
                  try {
                    reader.readAsDataURL(file);
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
            />
          </Button>
        </div>

        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Quiz Instructions</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Start typing the rules ..."
                  {...field}
                  className="border rounded-md p-2 w-full h-32 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<div className="flex gap-4" >

        <FormField
          control={form.control}
          name="module_id"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Module:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={ECourseType.OOP}>OOP</SelectItem>
                  <SelectItem value={ECourseType.ANALYSE}>Analyse</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Class Year:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {years?.map((year :any ,i : any)  => (
                      <SelectItem key={i} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
</div>
        <div className="flex justify-between items-center" >
        <FormField
          control={form.control}
          name="max_score"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Max Score</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Max score..."
                  {...field}
                  min={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="min_score"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Pass score</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Pass score..."
                  {...field}
                  min={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Quiz duration</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Quiz Duration..."
                  {...field}
                  min={1}
                  max={120}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="question_count"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Questions Count </FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    //@ts-ignore
                    value={
                      field.value
                        ?? ''
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      const selectedDate = new Date(value);
                      if (!isNaN(selectedDate.getTime())) {
                        const localDateTime = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
                        console.log('dss',localDateTime)
                        field.onChange(localDateTime);
                      } else {
                        field.onChange('');
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    //@ts-ignore
                    value={
                      field.value
                        ?? ''
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      const selectedDate = new Date(value);
                      if (!isNaN(selectedDate.getTime())) {
                        const localDateTime = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
                        console.log('dss',localDateTime)
                        field.onChange(localDateTime);
                      } else {
                        field.onChange('');
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}
