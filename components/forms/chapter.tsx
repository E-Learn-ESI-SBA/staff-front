"use client";
import { useForm } from "react-hook-form";
import { ChapterSchema, TChapterSchema } from "../../types/chapter/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PropsWithChildren, useId } from "react";
import {
  createChapter,
  updateChapter,
} from "@/app/actions/materials/chapter.actions";
import { IError } from "@/types/errors";
import { toast } from "sonner";
import { useModuleTreeStore } from "@/store/module/store";
import { Textarea } from "@/components/ui/textarea";
type Props = PropsWithChildren & {
  initialValues?: TChapterSchema;
  mode: "CREATE" | "UPDATE";
};
export function ChapterForm({
  initialValues = { id: "", name: "", description: "" },
  children,
  mode,
}: Props) {
  const formAction = mode === "CREATE" ? createChapter : updateChapter;
  const generatedID = useId();
  const form = useForm<TChapterSchema>({
    mode: "onSubmit",
    resolver: zodResolver(ChapterSchema),
    defaultValues: initialValues,
  });
  const { onSubmit, currentMap, onError } = useModuleTreeStore((state) => ({
    onSubmit: state.onSubmit,
    currentMap: state.currentMap,
    onError: state.onError,
  }));
  const submitHandler = async (v: TChapterSchema): Promise<void> => {
    try {
      const { data, error } = await formAction(v);
      if (error) {
        console.log(error);
        toast.error(error.message, {
          style: {
            backgroundColor: "red",
            color: "#fff",
          },
        });
        onError();
        return;
      }
      onSubmit((prev) => {
        if (mode === "CREATE") {
          return {
            ...prev,
            courses: [
              ...prev.courses,
              {
                id: generatedID,
                name: v.name,
                description: v.description,
                order: prev.courses.length + 1,
                sections: [],
              },
            ],
          };
        }
        const courseIndex = currentMap.get("selectedCourse");
        if (!courseIndex || courseIndex == -1) {
          return prev;
        }
        prev.courses[courseIndex].name = v.name;
        prev.courses[courseIndex].description = v.description;
        return prev;
      });
    } catch (e) {
      onError();
      const err = new IError(e);
      toast.error(err.message, {
        style: {
          backgroundColor: "red",
          color: "#fff",
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="w-full p-4 flex flex-col gap-4"
      >
        <FormField
          name="name"
          control={form.control}
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
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Chapter 01"
                    {...field}
                    className="min-h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          render={({ field }) => {
            return <input hidden={true} className="hidden" {...field} />;
          }}
          name="id"
          control={form.control}
        />
        {children}
      </form>
    </Form>
  );
}
