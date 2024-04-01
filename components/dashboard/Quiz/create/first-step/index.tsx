import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { examSchemaValidator } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Exam } from "@/types/quizForm";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { EQuizType } from "@/types/quizForm";
import { useQuestionFormStore } from '@/store/forms/questions/question.store';

const   defaultValues = {
  quiz_title: "",
  quiz_instructions: "",
  quiz_type: undefined,
  course: undefined,
  quiz_duration: undefined,
  question_time_limit: undefined,
  questions_count: undefined,
  start_date: undefined,
  end_date: undefined,
  start_time: '',
  end_time: '',
  id: "",
  createdAt: new Date().toISOString(),
}
export default function QuizFirstStepForm() {

	const {
		first_step_content,
		nextStep,
		setFirstStepContent,
	} = useQuestionFormStore((state) => ({
		nextStep: state.nextStep,
		setFirstStepContent: state.setFirstStepContent,
		first_step_content: state.first_step_content ?? defaultValues,
	}));

  const form = useForm<Exam>({
    resolver: zodResolver(examSchemaValidator),
    defaultValues : first_step_content ,
    mode: "onChange",
  });

  const submitHandler = (data: Exam) => {
    data.start_date = new Date(data.start_date);
    data.end_date = new Date(data.end_date);
    setFirstStepContent(data)
    nextStep();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-8 flex flex-col gap-4  w-full py-4"
      >

          <FormField
            control={form.control}
            name="quiz_title"
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
   <FormField
  control={form.control}
  name="quiz_instructions"
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

          					<FormField
							control={form.control}
							name="quiz_type"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Question Type:</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select Type Of Quiz" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={EQuizType.DEVOIR}>DEVOIR</SelectItem>
											<SelectItem value={EQuizType.TEST}>TEST</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
          					<FormField
							control={form.control}
							name="course"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Course:</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select Course" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="OOP">OOP</SelectItem>
											<SelectItem value='Analyse'>Analyse</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

          <FormField
            control={form.control}
            name="quiz_duration"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Quiz duration</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter Quiz Duration..." {...field} min={1} max={120} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
<div className="flex gap-4" >
          <FormField
            control={form.control}
            name="question_time_limit"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Questions Time Limit </FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="questions_count"
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
          </div>
<div className="flex gap-4" >
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                <Input
          type="date"
          value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            if (!isNaN(selectedDate.getTime())) {
              field.onChange(selectedDate);
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
          type="date"
          value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            if (!isNaN(selectedDate.getTime())) {
              field.onChange(selectedDate);
            }
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
          </div>
<div className="flex gap-4" >
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
 
          <Button type="submit" >
            Next
          </Button>

      </form>
    </Form>
  );
}
