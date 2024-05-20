"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IError } from "@/types/errors";
import { CommentSchema, TCommentForm } from "@/types/chapter/comments";
import {
  createComment,
  updateComment,
} from "@/app/actions/materials/comments.action";
type Props = PropsWithChildren & {
  onSubmit: (data: TCommentForm) => void;
  defaultValues?: TCommentForm;
  mode: "CREATE" | "UPDATE";
};
export function CommentForm({
  defaultValues,
  mode = "CREATE",
  children,
}: Props) {
  const formAction = mode === "CREATE" ? createComment : updateComment;
  const submitHandler = async (data: TCommentForm) => {
    try {
      const res = await formAction(data);
      if (res.error) {
        toast.error(res.error.message, {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
        return;
      }
      toast.success(res.data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    } catch (e) {
      const err = new IError(e);
      toast.error(err.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };
  const form = useForm<TCommentForm>({
    resolver: zodResolver(CommentSchema),
    mode: "onSubmit",
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-8 flex flex-col gap-4  py-4"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Input placeholder="Enter The comment here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => <Input className="hidden" {...field} />}
        />
        <FormField
          control={form.control}
          name="course_id"
          render={({ field }) => <Input className="hidden" {...field} />}
        />
        {children}
      </form>
    </Form>
  );
}
