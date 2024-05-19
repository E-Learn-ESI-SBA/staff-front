import {TFileFormSchema, TFileFormSchemaWithFile, TVideoSchema, VideoSchema} from "@/types/chapter/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {PropsWithChildren, useState} from "react";
import MultipleSelector, {Option} from "@/components/ui/multi-select";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {File} from "lucide-react";
import {FileComp} from "@/components/common/file-overview";
import {toast} from "sonner";
import {IError} from "@/types/errors";
import {createVideo, updateVideo} from "@/app/actions/materials/video.actions";

type Props = PropsWithChildren & {
  defaultValues?: TVideoSchema;
  sectionId: string;
  year:string
  mode : "CREATE" | "UPDATE";
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
export default function VideoForm({
  defaultValues,
  sectionId,
    mode,
  children,
}: Props) {
    const MAX_FILE_SIZE = 250000000;
    const [currentFile, setCurrentFile] = useState<File | null>(null);
  const form = useForm<TVideoSchema>({
    resolver: zodResolver(VideoSchema),
    defaultValues: defaultValues,
    mode: "onSubmit",
  });
  const action = mode === "CREATE" ? createVideo : updateVideo
    const submitHandler = async (data: TVideoSchema) => {

        try {
            const res = await action(data,currentFile);
            if (res.status === 200 || res.status == 201) {
                form.reset();
                toast.success(res.data.message, {
                    style: {
                        backgroundColor: "green",
                        color: "white",
                    },
                });
            } else {
                toast.error(res.error?.message ?? "Error While Doing this action", {
                    style: {
                        backgroundColor: "red",
                        color: "white",
                    },
                });
            }
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
  return (
    <Form {...form}>
      <form className="flex gap-4 flex-col " onSubmit={form.handleSubmit(submitHandler)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => {
            return (
              <>
                <FormLabel htmlFor="name" />
                <input
                  {...field}
                  id="name"
                  className="w-full"
                  placeholder="Name"
                />
                <FormMessage />
              </>
            );
          }}
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
          name="url"
          control={form.control}
          render={({ field }) => {
            return <input {...field} className="hidden" />;
          }}
        />
        <FormField
          name="id"
          control={form.control}
          render={({ field }) => {
            return <input type="hidden" {...field} />;
          }}
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
                      <FileComp f={currentFile} setCurrentFile={setCurrentFile}/>
                  )}
              </div>
          )}
        {children}
      </form>
    </Form>
  );
}
