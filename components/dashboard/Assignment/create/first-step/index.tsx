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
  assignment_title: "",
  assignment_description: "",
  quiz_type: undefined,
  course: undefined,
  start_date: undefined,
  end_date: undefined,
  start_time: "",
  end_time: "",
  id: "",
};
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
    data.start_date = new Date(data.start_date);
    data.end_date = new Date(data.end_date);
    setFirstStepContent(data);
    console.log("zez", data);
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
          name="assignment_title"
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
          name="assignment_description"
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

        <FormField
          control={form.control}
          name="assignment_type"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Assignment Type:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type Of Assignment" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={AssignmentType.AUTOMATED}>
                    AUTOMATED
                  </SelectItem>
                  <SelectItem value={AssignmentType.MANUAL}>MANUAL</SelectItem>
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
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : field.value
                    }
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
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : field.value
                    }
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
        <div className="flex gap-4">
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

        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}
