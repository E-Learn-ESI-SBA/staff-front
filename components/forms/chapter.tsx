import { Form, useForm } from "react-hook-form";
import { ChapterSchema, TChapterSchema } from "../../types/chapter/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PropsWithChildren } from "react";
import {
  createChapter,
  updateChapter,
} from "@/app/actions/materials/chapter.actions";
import { IError } from "@/types/errors";
type Props = PropsWithChildren & {
  initialValues: TChapterSchema;
  mode: "create" | "update";
};
export function ChapterForm({ initialValues, children, mode }: Props) {
  const formAction = mode === "create" ? createChapter : updateChapter;

  const form = useForm<TChapterSchema>({
    mode: "onSubmit",
    resolver: zodResolver(ChapterSchema),
    defaultValues: initialValues,
  });
  const submitHandler = async (v: TChapterSchema) => {
    try {
      const res = await formAction(v);
      if (res.error) {
        console.log(res.error);
        throw new IError(res.error.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="w-full p-4 flex flex-col gap-4"
      >
        <FormField
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Chapter 01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
          name="name"
          control={form.control}
        />
        <FormField
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Chapter 01"
                    {...field}
                    className="min-h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
          name="description"
          control={form.control}
        />
        {children}
      </form>
    </Form>
  );
}
