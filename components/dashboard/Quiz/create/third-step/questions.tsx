"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TypographyP } from "@/components/ui/typography";
import Image from "next/image";
import { useState} from "react";
import { OptionsComponent } from "./options";

export default function Questions({ form, index,id} :any ) {
  const [currentImage, setCurrentImage] = useState<string>(
    form.getValues(`questions.${index}.image`) ?? "/assets/person.png",
  );

  return (
    <div className="border border-[#A4A4A4] rounded-xl w-11/12 flex flex-col gap-4 p-4 ">
                    {form.setValue(
                      `questions.${index}.id`,
                      form.getValues(`questions.${index}.id`) ?? id ,
                    )}
      <div className="flex justify-between items-center gap-4">
        <FormField
          control={form.control}
          name={`questions.${index}.body`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Type Question Here "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name={`questions.${index}.score`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type="number"
                  placeholder="Type score"
                  {...field}
                  min={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <div className=" relative flex flex-col gap-4 ">
          <Image
            alt="Question Image"
            className=""
            width={150}
            height={100}
            src={currentImage.length > 0 ? currentImage : "/assets/person.png"}
          />
          <Button variant="default" className="relative self-end ">
            Upload Image
            <Input
              className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  form.setValue(`questions.${index}.file`, file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setCurrentImage(reader.result as string);
                    form.setValue(
                      `questions.${index}.image`,
                      reader.result as string,
                    );
                  };
                  try {
                    reader.readAsDataURL(file);
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
            />
          </Button>
        </div>
      </div>

      <OptionsComponent nestIndex={index} form={form} />

      {form.formState?.errors.questions && (
        <>
          {Object.keys(form.formState.errors.questions).map(
            (k,i) => (
              <p key={i} >
                {" "}
                {k == index && (
                  <TypographyP className="indent-6 text-red-600 my-5 text-sm">
                   {
                      form.formState.errors.questions[k].options?.root
                        ?.message
                    }
                  </TypographyP>
                )}{" "}
              </p>
            ),
          )}
        </>
      )}
    </div>
  );
}
