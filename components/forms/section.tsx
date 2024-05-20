"use client";
import {
  createSection,
  updateSection,
} from "@/app/actions/materials/sections.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SectionFormSchema, TSectionFormSchema } from "@/types/chapter/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {PropsWithChildren, SetStateAction, useId} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IError } from "@/types/errors";
import {Chapter} from "@/types/chapter/courses";
import {useModuleTreeStore} from "@/store/module/store";

type Props = PropsWithChildren & {
  defaultValues?: TSectionFormSchema;
  mode: "CREATE" | "UPDATE";
};
export function SectionForm({
  defaultValues,
  mode = "CREATE",
  children,
}: Props) {
  const {onSubmit,currentMap,onError} = useModuleTreeStore(state => ({
       onSubmit: state.onSubmit ,
    currentMap: state.currentMap,
      onError: state.onError,


  }))
  const formAction = mode === "CREATE" ? createSection : updateSection;
  const ID  = useId()
  const submitHandler = async (v: TSectionFormSchema) : Promise<void> => {
    try {
      const {data,error} = await formAction(v);
        if (error) {
           toast.error(error.message, {
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
           onError()
          return
        }
       toast.success(data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
        onSubmit((prev) => {

          if (mode === "CREATE") {
            const courseIndex = currentMap.get("selectedCourse")
            if (!courseIndex || courseIndex == -1) {
              return prev
            }

           const sections = prev.courses[courseIndex].sections
            sections.push({
              name: v.name,
              videos: [],
              files: [],
              teacher_id: ID,
              id:ID,
              notes:[],
              lectures:[],
            })
            prev.courses[courseIndex].sections = sections
            return prev
          }
            const courseIndex = currentMap.get("selectedCourse")
          const sectionIndex = currentMap.get("selectedSection")
          if(!courseIndex || !sectionIndex || courseIndex == -1 || sectionIndex == -1){
            return prev
          }
            prev.courses[courseIndex].sections[sectionIndex].name = v.name
            return prev
        })
      return
    } catch (e) {

      const err = new IError(e);
      toast.error(err.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
      onError()
    }
  };
  const form = useForm<TSectionFormSchema>({
    resolver: zodResolver(SectionFormSchema),
    mode: "onSubmit",
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-8 flex flex-col gap-4    py-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Section Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter The title here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
}
