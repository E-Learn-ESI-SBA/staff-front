"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SelectLabel } from "@radix-ui/react-select";

type Header<T> = {
  key: keyof T;
  label: string;
};
const FilterSchema = z.object({
  search: z.string().optional(),
  filters: z.array(
    z.object({
      key: z.string(),
      value: z.string().optional(),
    }),
  ),
});
type FilterType = z.infer<typeof FilterSchema>;
type Props<T> = {
  data: T[];
  withSearch?: boolean;
  filters: Header<T>[];
  setFilteredData: React.Dispatch<React.SetStateAction<T[]>>;
};

export function Filter<T>({
  filters,
  withSearch,
  data,
  setFilteredData,
}: Props<T>) {
  const form = useForm<FilterType>({
    mode: "onSubmit",
    defaultValues: {
      search: "",
      filters: filters.map((filter) => ({
        key: filter.key.toString(),
        value: "",
      })),
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "filters",
  });

  const distinctValues = (filter: Header<T>) => {
    const { key } = filter;
    return Array.from(new Set(data.map((d) => String(d[key]))));
  };

  const submitHandler = (values: FilterType) => {
    const filteredData = data.filter((item) => {
      if (
        values.search &&
        // @ts-ignore
        !Object.values(item).some((val) =>
          String(val)
            .toLowerCase()
            .includes(String(values.search).toLowerCase()),
        )
      ) {
        return false;
      }

      for (const filter of values.filters) {
        if (
          filter.value &&
          filter.value !== "none" &&
          String(item[filter.key as keyof T]) !== filter.value
        ) {
          return false;
        }
      }
      return true;
    });
    setFilteredData((_) => filteredData);
  };

  // The Ui
  return (
    <Form {...form}>
      <form
        className="flex items-center space-x-4 justify-between gap-4"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        {withSearch && (
          <FormField
            name="search"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        className="z-10 pl-8"
                        placeholder="Search"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}
        <div className="flex-1 flex gap-4 justify-start">
          {fields.map((field, index) => {
            const filter = filters.find((f) => f.key === field.key);
            if (!filter) return null;
            return (
              <FormField
                key={field.id}
                control={form.control}
                name={`filters.${index}.value`}
                render={({ field }) => {
                  return (
                    <FormItem className="flex  min-w-[180px] items-center gap-2 ">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={`Select By ${filter?.label}`}
                          />
                        </SelectTrigger>
                        <FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>
                                {`Select By ${filter?.label}`}
                              </SelectLabel>
                              <SelectItem key="none" value="none">
                                None
                              </SelectItem>
                              {distinctValues(filter).map((item) => (
                                <SelectItem
                                  value={item.toString()}
                                  key={item.toString()}
                                >
                                  {item as ReactNode}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </FormControl>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          <Button className="px-8 py-2  rounded-md" type="submit">
            Filter
          </Button>
        </div>
      </form>
    </Form>
  );
}
