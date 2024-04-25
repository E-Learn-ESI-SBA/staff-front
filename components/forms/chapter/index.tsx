import { Chapter } from "@/types/chapter/courses";
import { Form, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  ModuleOverviewSchema,
  TModuleOverviewSchema,
} from "../../../types/chapter/zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  initialValues: TModuleOverviewSchema;
};
export function OverViewForm({ initialValues }: Props) {
  const form = useForm<TModuleOverviewSchema>({
    mode: "onSubmit",
    resolver: zodResolver(ModuleOverviewSchema),
    defaultValues: initialValues,
  });

  const { append, fields } = useFieldArray({
    control: form.control,
    name: "plan",
  });

  const submitHandler = (v: TModuleOverviewSchema) => {};
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}></form>
      </Form>
    </div>
  );
}
