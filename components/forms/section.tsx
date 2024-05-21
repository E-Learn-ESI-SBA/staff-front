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
import { PropsWithChildren, SetStateAction, useId } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IError } from "@/types/errors";
import { Chapter } from "@/types/chapter/courses";
import { useModuleTreeStore } from "@/store/module/store";
import { dummyMutationSuccess } from "@/static/mock";

type Props = PropsWithChildren & {
  defaultValues?: TSectionFormSchema;
  mode: "CREATE" | "UPDATE";
};
export function SectionForm({
  defaultValues = {
    name: "",
    id: "",
  },
  mode = "CREATE",
  children,
}: Props) {
  const { onSubmit, currentMap, setButtonLoading, onError } =
    useModuleTreeStore((state) => ({
      onSubmit: state.onSubmit,
      currentMap: state.currentMap,
      onError: state.onError,
      setButtonLoading: state.setButtonLoading,
    }));
  const formAction = mode === "CREATE" ? createSection : updateSection;
  const ID = useId();
  const submitHandler = async (v: TSectionFormSchema): Promise<void> => {
    try {
      setButtonLoading(true);
      const { data, error } = await dummyMutationSuccess();
      if (error) {
        toast.error(error.message, {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
        onError();
        return;
      }
      toast.success(data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      onSubmit((prev) => {
        if (mode === "CREATE") {
          const courseIndex = currentMap.get("selectedCourse");
          if (!courseIndex || courseIndex === -1) {
            return prev;
          }

          const sections = prev.courses[courseIndex].sections;
          sections.push({
            name: v.name,
            videos: [],
            files: [],
            teacher_id: ID,
            id: ID,
            notes: [],
            lectures: [],
          });
          prev.courses[courseIndex].sections = sections;
          return prev;
        }
        const courseIndex = currentMap.get("selectedCourse");
        const sectionIndex = currentMap.get("selectedSection");
        console.log(sectionIndex, courseIndex);
        if (
          courseIndex === undefined ||
          sectionIndex === undefined ||
          courseIndex === -1 ||
          sectionIndex === -1
        ) {
          console.log("Here ...");
          return prev;
        }
        prev.courses[courseIndex].sections[sectionIndex].name = v.name;
        console.log("Here 22 ...");

        return prev;
      });
      return;
    } catch (e) {
      const err = new IError(e);
      toast.error(err.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
      onError();
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
        <h2 className="text-lg font-semibold">
          {mode === "UPDATE" ? "Edit" : "Create"} Section{" "}
        </h2>

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
