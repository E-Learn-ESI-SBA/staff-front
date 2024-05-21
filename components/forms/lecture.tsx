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
import { LectureSchema, TLectureSchema } from "@/types/chapter/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IError } from "@/types/errors";
import { updateLecture } from "@/app/actions/materials/lecture.actions";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { useModuleTreeStore } from "@/store/module/store";
import { dummyMutationSuccess } from "@/static/mock";

type Props = PropsWithChildren & {
  defaultValues?: TLectureSchema;
  year: string;
};
export function LectureForm({
  defaultValues = { groups: [], name: "", id: "", sectionId: "" },
  children,
}: Props) {
  const { onSubmit, currentMap, setButtonLoading, onError } =
    useModuleTreeStore((state) => ({
      onSubmit: state.onSubmit,
      currentMap: state.currentMap,
      onError: state.onError,
      setButtonLoading: state.setButtonLoading,
    }));
  const submitHandler = async (v: TLectureSchema): Promise<void> => {
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
      onSubmit((prev) => {
        const courseIndex = currentMap.get("selectedCourse");
        const sectionIndex = currentMap.get("selectedSection");
        const lectureIndex = currentMap.get("selectedResource");
        if (
          courseIndex === undefined ||
          sectionIndex === undefined ||
          lectureIndex === undefined ||
          lectureIndex === -1 ||
          sectionIndex === -1 ||
          courseIndex === -1
        )
          return prev;
        const newPrev = { ...prev };
        newPrev.courses[courseIndex].sections[sectionIndex].lectures[
          lectureIndex
        ].name = v.name;
        newPrev.courses[courseIndex].sections[sectionIndex].lectures[
          lectureIndex
        ].groups = v.groups.map((g) => g.value);
        return newPrev;
      });
      toast.success(data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
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
  const form = useForm<TLectureSchema>({
    resolver: zodResolver(LectureSchema),
    mode: "onSubmit",
    defaultValues: defaultValues,
  });
  const groups: Option[] = [
    {
      label: "Group 1",
      value: "1",
    },
    {
      label: "Group 2",
      value: "2",
    },
    {
      label: "Group 3",
      value: "3",
    },
    {
      label: "Group 4",
      value: "4",
    },
    {
      label: "Group 5",
      value: "5",
    },
    {
      label: "Group 6",
      value: "6",
    },
    {
      label: "Group 7",
      value: "7",
    },
    {
      label: "Group 8",
      value: "8",
    },
  ];
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-8 flex flex-col gap-4    py-4"
      >
        <h2 className="text-lg font-semibold">Edit Lecture </h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Lecture Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter The title here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="groups"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Groups</FormLabel>
              {
                //    <GroupSelector label="Select Group" value={field.value} onChange={field.onChange} year={year}  />
              }
              <FormControl>
                <MultipleSelector
                  aria-label="Select groups"
                  className="z-10"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select groups"
                  options={groups}
                  defaultOptions={groups}
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => <Input {...field} hidden className="hidden" />}
        />
        <FormField
          control={form.control}
          name="sectionId"
          render={({ field }) => <Input {...field} hidden className="hidden" />}
        />
        {children}
      </form>
    </Form>
  );
}
