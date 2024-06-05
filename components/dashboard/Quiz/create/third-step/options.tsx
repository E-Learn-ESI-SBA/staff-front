import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "@radix-ui/react-icons";
import { useFieldArray } from "react-hook-form";

export const OptionsComponent = ({ nestIndex, form }:any) => {
  const { fields, append, remove } = useFieldArray({
    name: `questions.${nestIndex}.options`,
    control: form.control,
  });

  return (
    <div>
      <label>Options:</label>
      <div>
        {fields.map((item, k) => {
          return (
            <div
              key={item.id}
              className="flex justify-between items-center gap-4 my-4"
            >
           {form.setValue(
                      `questions.${nestIndex}.options.${k}.id`,
                      form.getValues(`questions.${nestIndex}.options.${k}.id`) ?? item.id ,
                    )}
              <FormField
                control={form.control}
                name={`questions.${nestIndex}.options.${k}.option`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input type="text"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`questions.${nestIndex}.options.${k}.validity`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        defaultChecked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="outline" size="sm" onClick={() => remove(k)}>
                <TrashIcon className="text-red-700" />
              </Button>
            </div>
          );
        })}

        <button
          className="bg-[#F3F6FF] text-[#3D70F5] rounded-lg m-2 py-2 px-4"
          type="button"
          onClick={() =>
            append({
              title: "",
              validity: false,
            })
          }
        >
          + add option
        </button>
      </div>
    </div>
  );
};
