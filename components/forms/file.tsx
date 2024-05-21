"use client";
import { createFile, updateFile } from "@/app/actions/materials/files.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FileFormSchema,
  TFileFormSchema,
  TFileFormSchemaWithFile,
} from "@/types/chapter/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import MultipleSelector, { Option } from "../ui/multi-select";
import { Label } from "../ui/label";
import { Delete, File } from "lucide-react";
import { Button } from "../ui/button";
import { IError } from "@/types/errors";
import { FileComp } from "@/components/common/file-overview";
import { useModuleTreeStore } from "@/store/module/store";
import { dummyMutationSuccess } from "@/static/mock";

type Props = PropsWithChildren & {
  defaultValues?: TFileFormSchema;
  mode: "CREATE" | "UPDATE";
  year?: string;
};
export function FileForm({
  defaultValues = { id: "", name: "", groups: [], section_id: "" },
  mode = "CREATE",
  children,
}: Props) {
  const { currentMap, setButtonLoading, onError, onSubmit } =
    useModuleTreeStore((state) => ({
      currentMap: state.currentMap,
      onSubmit: state.onSubmit,
      onError: state.onError,
      setButtonLoading: state.setButtonLoading,
    }));
  const ID = useId();
  const form = useForm<TFileFormSchema>({
    resolver: zodResolver(FileFormSchema),
    mode: "onSubmit",
    defaultValues: defaultValues,
  });
  const action = mode === "CREATE" ? createFile : updateFile;
  const submitHandler = async (v: TFileFormSchema) => {
    console.log(v);
    const dataWithFile: TFileFormSchemaWithFile = {
      ...v,
      file: currentFile,
    };
    try {
      setButtonLoading(true);
      const { data, error } = await dummyMutationSuccess();
      if (!error) {
        form.reset();
        toast.success(data.message, {
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
        onSubmit((prev) => {
          if (mode == "CREATE") {
            const courseIndex = currentMap.get("selectedCourse");
            const sectionIndex = currentMap.get("selectedSection");
            if (
              !courseIndex ||
              !sectionIndex ||
              sectionIndex === -1 ||
              courseIndex === -1
            )
              return prev;
            const newPrev = { ...prev };
            newPrev.courses[courseIndex].sections[sectionIndex].files.push({
              name: v.name,
              groups: v.groups.map((g) => g.value),
              url: "https://www.google.com",
              id: ID,
              type: currentFile?.type ?? "pdf",
              teacher_id: "1",
            });
            return newPrev;
          }
          const courseIndex = currentMap.get("selectedCourse");
          const sectionIndex = currentMap.get("selectedSection");
          const fileIndex = currentMap.get("selectedResource");
          if (
            courseIndex === undefined ||
            sectionIndex === undefined ||
            !fileIndex ||
            fileIndex === -1 ||
            sectionIndex === -1 ||
            courseIndex === -1
          )
            return prev;
          const newPrev = { ...prev };
          newPrev.courses[courseIndex].sections[sectionIndex].files[
            fileIndex
          ].name = v.name;
          newPrev.courses[courseIndex].sections[sectionIndex].files[
            fileIndex
          ].groups = v.groups.map((g) => g.value);
          return newPrev;
        });
      } else {
        toast.error(error?.message ?? "Error While Doing this action", {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
        onError();
      }
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
  const MAX_FILE_SIZE = 8000000;
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-8 flex flex-col gap-4  w-full py-4"
      >
        <h2 className="text-lg font-semibold">
          {mode === "UPDATE" ? "Edit" : "Create"} File{" "}
        </h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>File Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter The name here..." {...field} />
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

        {mode == "CREATE" && (
          <div className="flex flex-col gap-4 border justify-center relative items-center p-6 w-full min-h-[100px]">
            {!currentFile ? (
              <>
                <Input
                  required
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.py,.java, .c, .cpp, .pas"
                  type="file"
                  className="w-fll absolute top-0 h-full  opacity-0"
                  onChange={(e) => {
                    if (
                      e.target.files &&
                      e.target.files[0].size < MAX_FILE_SIZE
                    ) {
                      setCurrentFile(() =>
                        e.target?.files ? e.target?.files[0] : null,
                      );
                    }
                  }}
                />

                <Label>Attached File</Label>
                <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                  Drag and Drop or file browse with size lower then 8MB
                </p>
              </>
            ) : (
              <FileComp f={currentFile} setCurrentFile={setCurrentFile} />
            )}
          </div>
        )}
        {children}
      </form>
    </Form>
  );
}
