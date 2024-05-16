"use client";
import { createSection, updateSection } from "@/app/actions/actions";
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
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {IError} from "@/types/errors";

type Props = PropsWithChildren & {
  onSubmit: (data: TSectionFormSchema) => void;
  defaultValues?: TSectionFormSchema;
  mode: "CREATE" | "UPDATE";
};
export function SectionForm({
  defaultValues,
  mode = "CREATE",
  children,
}: Props) {
 const formAction = mode === "CREATE" ? createSection : updateSection;
 const submitHandler = async  (data: TSectionFormSchema) => {
   try {
   const res = await formAction(data);
   toast.success(res.message)
   } catch (e) {
     const err = new IError(e)
     toast.error(err.message
     )
   }
 }
  const form = useForm<TSectionFormSchema>({
    resolver: zodResolver(SectionFormSchema),
    mode: "onSubmit",
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formAction)}
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
