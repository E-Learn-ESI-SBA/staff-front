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
import {PropsWithChildren, SetStateAction, useId} from "react";
import {
  createChapter,
  updateChapter,
} from "@/app/actions/materials/chapter.actions";
import { IError } from "@/types/errors";
import {Chapter, Module} from "@/types/chapter/courses";
import {toast} from "sonner";
type Props = PropsWithChildren & {
  initialValues?: TChapterSchema;
  mode: "create" | "update";
  index?: number
};
export function ChapterForm({ initialValues= {id:"",name:"",description:""}, children, mode,loading,clientUpdate ,index}: Props) {
  const formAction = mode === "create" ? createChapter : updateChapter;
  const generatedID = useId()
  const form = useForm<TChapterSchema>({
    mode: "onSubmit",
    resolver: zodResolver(ChapterSchema),
    defaultValues: initialValues,
  });
  const submitHandler = async (v: TChapterSchema) => {
    try {
      loading(true)
        const res = await formAction(v);
      if (res.error) {
        console.log(res.error);
        toast.error(res.error.message, { style:{
            backgroundColor: "red",
            color: "#fff",
            }});
      }
        if (res.data) {
           if(mode === "update") {
                clientUpdate((prev) => {
                     const newModules = prev.courses.map((c:Chapter,i:number) => {
                          if(i === index) {
                            return {
                                ...c,
                                name:v.name,
                                description:v.description
                            }
                          }
                          return c
                     })
                     return {...prev,courses:newModules}
                })

           } else {
                clientUpdate((prev) => {
                    return {...prev,courses:[...prev.courses,{id:generatedID,name:v.name,description:v.description,order:prev.courses.length + 1,sections:[]}]}
                })
           }
            toast.success("Chapter created successfully", { style:{
                backgroundColor: "green",
                color: "#fff",
                }});
        }

    } catch (e) {
        const err = new IError(e)
        toast.error(err.message, {
            style:{
                backgroundColor: "red",
                color: "#fff",
                }
        });
      console.log(e);
    } finally {
        loading(false)
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
          <FormField
              render={({ field }) => {
                  return (
                              <Input
                                  hidden={true}
                                  className="hidden"
                                  {...field}
                              />
                  );
              }}
              name="id"
              control={form.control}
          />
        {children}
      </form>
    </Form>
  );
}
