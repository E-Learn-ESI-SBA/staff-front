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
import { useState, useRef } from "react";
import { AnswersComponent } from "./answers";

export default function Questions({ form, index }) {
  const [currentImage, setCurrentImage] = useState<string>(
    form.getValues(`questions.${index}.qst_image`) ?? "/assets/person.png",
  );
  const inputFileRef = useRef<HTMLInputElement>(null);

  const save = () => {
    form.setValue(`questions.${index}.qst_image`, currentImage);
  };

  return (
    <div className="border border-[#A4A4A4] rounded-xl w-11/12 flex flex-col gap-4 p-4 ">
      <div className="flex justify-between items-center gap-4">
        <FormField
          control={form.control}
          name={`questions.${index}.qst_title`}
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

        <div className=" relative flex justify-start gap-4 ">
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
              ref={inputFileRef}
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setCurrentImage(reader.result as string);
                    form.setValue(
                      `questions.${index}.qst_image`,
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

      <AnswersComponent nestIndex={index} form={form} />

      {form.formState?.errors.questions && (
        <>
          {Object.keys(form.formState.errors.questions).map(
            (key, indexError) => (
              <p key={indexError}>
                {" "}
                {key == index && (
                  <TypographyP className="indent-6 text-red-600 my-5 text-sm">
                    {
                      form.formState.errors.questions[key].answers?.root
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
