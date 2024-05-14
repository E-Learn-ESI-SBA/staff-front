import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  description: string;
  points: string[];
};

export default function Overview({ title, description, points }: Props) {
  return (
    <div className="w-full flex flex-col justify-center">
      <div>
        <h1 className="text-black text-lg xl:text-2xl lg:text-xl font-medium p-4">
          {title}
        </h1>
      </div>
      <div className="text-text-GRAY rounded-3xl p-4">
        <h5 className="text-secondary text-lg xl:text-3xl lg:text-xl font-medium my-4">
          Description
        </h5>
        <p
          className="min-h-96 p-8 text-xs sm:text-sm text-black rounded-3xl"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className="p-8 lg:p-12">
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
          <h5 className="text-secondary text-lg xl:text-3xl lg:text-xl font-medium">
            What you will learn in this course :
          </h5>
          <div className="grid grid-cols-2  gap-4">
            {points.map((p, i) => (
              <div className="flex items-center w-full   gap-1" key={i}>
                <Image
                  src="/assets/icons/courses/check.svg"
                  width={30}
                  height={30}
                  alt="overview"
                />
                <p className=" text-sm md:text-base ">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
