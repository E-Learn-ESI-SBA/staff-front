import { TVideoSchema, VideoSchema } from "@/types/chapter/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PropsWithChildren, useId, useState } from "react";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileComp } from "@/components/common/file-overview";
import { toast } from "sonner";
import { IError } from "@/types/errors";
import {
  createVideo,
  updateVideo,
} from "@/app/actions/materials/video.actions";
import { useModuleTreeStore } from "@/store/module/store";
import { dummyMutationSuccess } from "@/static/mock";

type Props = PropsWithChildren & {
  defaultValues?: TVideoSchema;
  sectionId: string;
  year: string;
  mode: "CREATE" | "UPDATE";
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
  defaultValues = {
    groups: [],
    name: "",
    id: "",
    url: "",
    section_id: "",
  },
  //sectionId,
  mode,
  children,
}: Props) {
  const { onSubmit, currentMap, setButtonLoading, onError } =
    useModuleTreeStore((state) => ({
      onSubmit: state.onSubmit,
      currentMap: state.currentMap,
      onError: state.onError,
      setButtonLoading: state.setButtonLoading,
    }));
  const ID = useId();
  const MAX_FILE_SIZE = 250000000;
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const form = useForm<TVideoSchema>({
    resolver: zodResolver(VideoSchema),
    defaultValues: defaultValues,
    mode: "onSubmit",
  });
  const action = mode === "CREATE" ? createVideo : updateVideo;
  const submitHandler = async (v: TVideoSchema): Promise<void> => {
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
      } else {
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
              courseIndex === undefined ||
              sectionIndex === undefined ||
              sectionIndex === -1 ||
              courseIndex === -1
            )
              return prev;
            const newPrev = { ...prev };
            newPrev.courses[courseIndex].sections[sectionIndex].videos.push({
              name: v.name,
              groups: v.groups.map((g) => g.value),
              url: "https://www.google.com", // Should be ui that tells user to load the page
              id: ID,
              teacher_id: ID,
            });
            return newPrev;
          }
          const courseIndex = currentMap.get("selectedCourse");
          const sectionIndex = currentMap.get("selectedSection");
          const videoIndex = currentMap.get("selectedResource");
          if (
            courseIndex === undefined ||
            sectionIndex === undefined ||
            videoIndex === undefined ||
            videoIndex === -1 ||
            sectionIndex === -1 ||
            courseIndex === -1
          )
            return prev;
          const newPrev = { ...prev };
          newPrev.courses[courseIndex].sections[sectionIndex].videos[
            videoIndex
          ].name = v.name;
          newPrev.courses[courseIndex].sections[sectionIndex].videos[
            videoIndex
          ].groups = v.groups.map((g) => g.value);
          return newPrev;
        });
        form.reset();
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
  return (
    <Form {...form}>
      <form
        className="flex gap-4 flex-col "
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <h2 className="text-lg font-semibold">
          {mode === "UPDATE" ? "Edit" : "Create"} Video{" "}
        </h2>

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
        <FormField
          name="section_id"
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
                  accept=".mp4"
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

                <Label>Attached Video</Label>
                <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                  please load a video with size lower than 250MB
                </p>
              </>
            ) : (
              <FileComp
                f={currentFile}
                setCurrentFile={setCurrentFile}
                loadType="VIDEO"
              />
            )}
          </div>
        )}
        {children}
      </form>
    </Form>
  );
}
