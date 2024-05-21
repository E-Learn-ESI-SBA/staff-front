"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { moduleSchemaValidator, TModuleSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { IError } from "@/types/errors";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CircleCheck, Delete, Plus, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  data: {
    title: string;
    description: string;
    points: string[];
  };
  setClose: (value?: TModuleSchema) => void;
  mode: "CREATE" | "UPDATE";
};
export function EditModule({ data, setClose, mode }: Props) {
  const form = useForm<TModuleSchema>({
    mode: "onSubmit",
    resolver: zodResolver(moduleSchemaValidator),
    defaultValues: {
      title: data.title,
      description: data.description,
      points: data.points.map((p) => ({ value: p })),
    },
  });
  const submitHandler = (data: TModuleSchema) => {
    try {
      console.log(data);
      setClose(data);
    } catch (e) {
      setClose();
      const err = new IError(e);
      console.log(err.message);
      toast.error(err.message);
    }
  };
  const { fields, append, remove } = useFieldArray<TModuleSchema>({
    name: "points",
    control: form.control,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="w-full  flex flex-col gap-4 justify-center p-4"
      >
        <FormField
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel
                  htmlFor="title"
                  className="text-black text-lg xl:text-2xl lg:text-xl font-medium p-4"
                >
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Distributed Transactions"
                    id="title"
                    className="text-black w-full text-lg xl:text-2xl lg:text-xl outline-none font-medium p-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
          name="title"
          control={form.control}
        />
        <FormField
          render={({ field }) => {
            return (
              <FormItem className="text-text-GRAY rounded-3xl ">
                <FormLabel
                  htmlFor="title"
                  className="text-secondary text-lg xl:text-3xl lg:text-xl font-medium my-4"
                >
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Distributed Transactions"
                    id="title"
                    className="min-h-96 p-8 text-xs sm:text-sm text-black rounded-3xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
          name="description"
          control={form.control}
        />
        <div className="p-8 lg:p-12">
          <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
            <h5 className="text-secondary text-lg xl:text-3xl lg:text-xl font-medium">
              What you will learn in this course :
            </h5>
            <div className="grid grid-cols-2  gap-4">
              {fields.map((item, k) => {
                return (
                  <div className="flex gap-2 items-center" key={item.id}>
                    <FormField
                      name={`points.${k}.value`}
                      render={({ field }) => {
                        console.log("Field", field, k);
                        return (
                          <div
                            className="flex w-full items-center gap-2"
                            key={k}
                          >
                            <FormItem className="text-text-GRAY flex gap-2 rounded-3xl p-4">
                              <FormLabel htmlFor="title">
                                <CircleCheck
                                  className="w-8 h-8 text-white "
                                  fill="#0066FF"
                                />
                              </FormLabel>
                              <FormControl className="flex-1 w-full">
                                <Input
                                  {...field}
                                  placeholder="Distributed Transactions"
                                  id="title"
                                  className="text-sm md:text-base w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </div>
                        );
                      }}
                      control={form.control}
                      key={k}
                    />
                    <Button
                      variant="ghost"
                      disabled={fields.length < 2}
                      className="p-4"
                      onClick={() => {
                        console.log("Delete Plan", k);
                        remove(k);
                      }}
                      type="button"
                    >
                      <Trash2 className="text-red-origin w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
            <Button
              className="flex mt-4 p-4 gap-2"
              variant="ghost"
              onClick={() =>
                append({
                  value: "",
                })
              }
            >
              Add Point
              <Plus className="w-6 h-6 text-blue-origin" />
            </Button>
          </div>
        </div>
        <div className="flex justify-end items-center gap-4">
          <Button
            variant="ghost"
            className="p-4 px-6 border "
            onClick={() => setClose()}
          >
            Cancel
          </Button>
          <Button type="submit" className="text-white  p-4 px-6 ">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
