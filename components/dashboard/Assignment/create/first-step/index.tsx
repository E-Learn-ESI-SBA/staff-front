import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { assignmentSchemaValidator } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Assignment } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AssignmentType } from "@/types/assignment";
import { ECourseType } from "@/types";
import { useAssignmentFormStore } from "@/store/forms/assignments/question.store";

const defaultValues = {
  title: "",
  description: "",
  module_id: undefined,
  end_date: undefined,
  end_time: "",
  year: "",
};

const years = ['1cp', '2cp', '1cs', '2cs', '3cs']
export default function AssignmentFirstStepForm() {
  const { first_step_content, nextStep, setFirstStepContent } =
    useAssignmentFormStore((state) => ({
      nextStep: state.nextStep,
      setFirstStepContent: state.setFirstStepContent,
      first_step_content: state.first_step_content ?? defaultValues,
    }));

  const form = useForm<Assignment>({
    resolver: zodResolver(assignmentSchemaValidator),
    defaultValues: first_step_content,
    mode: "onChange",
  });

  const submitHandler = (data: Assignment) => {
    setFirstStepContent(data);
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
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Assignment Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter assignment title here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Assignment Description</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Start typing the description ..."
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
                    {years?.map((year: any, i: any) => (
                      <SelectItem key={i} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        <FormField
          control={form.control}
          name="deadline"
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
                      console.log('dss', localDateTime)
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

        <Button type="submit" className="w-fit self-end p-5">Next</Button>
      </form>
    </Form>
  );
}
