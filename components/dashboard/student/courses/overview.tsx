import Image from "next/image";
import React from "react";

type Props = {
  description: string;
  points: string[];
};

export default function Overview({ description, points }: Props) {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="text-text-GRAY rounded-3xl p-4">
        <h1 className="text-secondary text-lg xl:text-3xl lg:text-xl font-medium my-4">
          Description
        </h1>
        <div
          className="bg-white p-8 rounded-3xl"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <h1 className="text-black text-lg xl:text-3xl lg:text-xl font-medium p-4">
        What you will learn in this course
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {points.map((p, i) => (
          <div className="flex justify-between mb-4" key={i}>
            <div className="w-1/2 relative">
              <Image
                src="/assets/icons/courses/check.svg"
                width={30}
                height={30}
                alt="overview"
                className="absolute"
              />
              <p className="ml-8">{p}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
