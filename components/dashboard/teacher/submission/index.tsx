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
import { useUserStore } from "@/store/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Submission = {
  feedback: string;
  grade: number;
  file: string;
};

const SingleSubmission = ({ submission }: { submission: any }) => {
  const router = useRouter();
  const { user } = useUserStore()
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
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        toast.success("Submission Evaluated successfully", {
          style: {
            backgroundColor: "green",
            color: "white",
          }
        });
        setTimeout(() => {
          router.replace(`/app/teacher/assignment/${submission.assignment_id}`);
        }, 2000);

        console.log("Submission updated successfully", response);
      } else {
        toast.error("Something went wrong", {
          style: {
            backgroundColor: "red",
            color: "white",
          }
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        style: {
          backgroundColor: "red",
          color: "white",
        }
      });
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

          <Button type="submit" className="w-fit self-end p-5">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default SingleSubmission;
