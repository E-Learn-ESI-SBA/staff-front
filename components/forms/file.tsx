"use client";
import { createFile, updateFile } from "@/app/actions/actions";
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
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import MultipleSelector, { Option } from "../ui/multi-select";
import { Label } from "../ui/label";
import { Delete, File } from "lucide-react";
import { Button } from "../ui/button";
import { z } from "zod";

type Props = PropsWithChildren & {
  defaultValues?: TFileFormSchema;
  mode: "CREATE" | "UPDATE";
};
export function FileForm({ defaultValues, mode = "CREATE", children }: Props) {

  const form = useForm<TFileFormSchema>({
    resolver: zodResolver(FileFormSchema),
    mode: "onSubmit",
    defaultValues: defaultValues,
  });
  const action = mode === "CREATE" ? createFile : updateFile;
  const submitHandler = (data: TFileFormSchema) => {
    console.log(data);
    const dataWithFile:TFileFormSchemaWithFile = {
      ...data,
      file: currentFile,
    };

    action(dataWithFile);
  };
  //@ts-ignore
  if (state.status === "success") {
    form.reset();
    //@ts-ignore
    toast.success(state.message, {
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  }
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

  const FileComp = ({ f }: { f: File }) => {
    return (
      <div className="flex justify-between w-full items-center gap-4 ">
        <div className="flex items-center gap-2 p-2">
          <File className="w-8 h-8 text-green-origin" />
          <div className="flex flex-col gap-px  ">
            <p className="text-xs  text-gray-600 dark:text-gray-400">
              name: {f.name.slice(1, f.name.length / 6)}
            </p>
            <p className="text-xs  text-gray-600 dark:text-gray-400">
              Type : {f.type.split("/")[1]}
            </p>
            <p className="text-xs  text-gray-600 dark:text-gray-400">
              Size: {f.size / Math.pow(2, 10)}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={() => {
            setCurrentFile(() => null);
          }}
        >
          <Delete className="text-red-origin w-8 h-8" />
        </Button>
      </div>
    );
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-8 flex flex-col gap-4  w-full py-4"
      >
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

        <div className="flex flex-col gap-4 border justify-center relative items-center p-6 w-full min-h-[100px]">
          {!currentFile ? (
            <>
              <Input
                required
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.py,.java, .c, .cpp, .pas"
                type="file"
                className="w-fll absolute top-0 h-full  opacity-0"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0].size < MAX_FILE_SIZE) {
                    setCurrentFile(() => e.target?.files ? e.target?.files[0] : null);
                  }
                }}
              />

              <Label>Attached File</Label>
              <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                Drag and Drop or file browse with size lower then 8MB
              </p>
            </>
          ) : (
            <FileComp f={currentFile} />
          )}
        </div>
        {children}
      </form>
    </Form>
  );
}
