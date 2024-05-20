"use client";
import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { EditModule } from "@/components/forms/module";
import { Button } from "@/components/ui/button";
import { TModuleSchema } from "@/types/zod";

type TData = {
  title: string;
  description: string;
  points: string[];
};
interface OverviewProps {
  withEdit?: boolean;
  data: TData;
  options?: {
    withEdit?: boolean;
    editHandler?: (data: TData) => void;
  };
}

export const Overview = ({
  withEdit = false,
  data: { title, description, points },
}: OverviewProps) => {
  const closeHandler = (value?: TModuleSchema) => {
    if (value) {
      console.log(value);
      setCurrentData((prev) => ({
        ...prev,
        title: value.title,
        description: value.description,
        points: value.points.map((p) => p.value),
      }));
    }
    setEdit(false);
  };
  const [currentData, setCurrentData] = useState<TData>({
    title,
    description,
    points,
  });
  const [edit, setEdit] = useState(false);
  const OverviewComp = () => {
    return (
      <div className="w-full flex flex-col justify-center">
        <div className="flex justify-between flex-wrap">
          <h1 className="text-black text-lg xl:text-2xl lg:text-xl font-medium p-4">
            {currentData.title}
          </h1>
          {withEdit && (
            <Button className="p-4 px-6 w-fit " onClick={() => setEdit(!edit)}>
              Edit
            </Button>
          )}
        </div>
        <div className="text-text-GRAY rounded-3xl p-4">
          <h5 className="text-secondary text-lg xl:text-3xl lg:text-xl font-medium my-4">
            Description
          </h5>
          <p
            className="min-h-96 p-8 text-xs sm:text-sm text-black rounded-3xl"
            dangerouslySetInnerHTML={{ __html: currentData.description }}
          />
        </div>
        <div className="p-8 lg:p-12">
          <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
            <h5 className="text-secondary text-lg xl:text-3xl lg:text-xl font-medium">
              What you will learn in this course :
            </h5>
            <div className="grid grid-cols-2  gap-4">
              {currentData.points.map((p, i) => (
                <div className="flex items-center w-full   gap-2" key={i}>
                  <CircleCheck className="w-8 h-8 text-white " fill="#0066FF" />
                  <p className=" text-sm md:text-base ">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return !edit ? (
    <OverviewComp />
  ) : (
    <EditModule data={currentData} setClose={closeHandler} mode="UPDATE" />
  );
};
