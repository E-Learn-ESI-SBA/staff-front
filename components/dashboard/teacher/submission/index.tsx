'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { submissionSchemaValidator } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { ASSIGNMENT_BASE_URL } from "@/config/constants";
import { Input } from "@/components/ui/input";

type Submission = {
  feedback: string;
  grade: number;
  file: string;
};

const SingleSubmission = ({ submission }: { submission: any }) => {
  const Sub = {
    feedback: submission.feedback,
    grade: submission.grade,
    file: submission.file,
  };

  const form = useForm<Submission>({
    resolver: zodResolver(submissionSchemaValidator),
    defaultValues: Sub,
    mode: "onChange",
  });

  const submitHandler = async (data: any) => {
    console.log('data', data);
    const { file, ...submissionData } = data;
    try {
      const response = await fetch(`${ASSIGNMENT_BASE_URL}/assignments/${submission.assignment_id}/submissions/${submission.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NTUxMzk3LCJpYXQiOjE3MTU5NTkzOTcsImp0aSI6IjYxN2EwNDU3MzNiNDQxNDlhNjY5Y2ZmMjkzOGQ3ZWFlIiwiaWQiOiIyMjNlYmU5Yi1jMWMyLTQ5M2EtYTdiYS02OThhOTM1NjdkYmUiLCJhdmF0YXIiOiJkZWZhdWx0IiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AaG9zdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJncm91cCI6Ik5vbmUiLCJ5ZWFyIjoiTm9uZSJ9.2UFOb8hOBkfnGpWHgkQdJcnbK6YwqbEtn9aIFA-FNBc`,
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        console.log("Submission updated successfully", response);
      } else {
        console.error("Failed to update submission");
      }
    } catch (error) {
      console.error("Error updating submission:", error);
    }
  };

  return (
    <div className="p-4 bg-[#F4F7FE]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="space-y-8 flex flex-col gap-4 w-full py-4"
        >
          <div className="flex gap-4">
            <p>file :</p>
            <a
              href={`${ASSIGNMENT_BASE_URL}/files/${submission.file}`}
              className="text-blue-500"
              download
            >
              download
            </a>
          </div>

          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Grade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter grade..."
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
            name="feedback"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Feedback</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Enter feedback..."
                    {...field}
                    className="border rounded-md p-2 w-full h-32 resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default SingleSubmission;
