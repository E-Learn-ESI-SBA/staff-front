import Image from "next/image";
import Link from "next/link";
import React from "react";
import ViewAll from "./viewAll";

type Props = {
  title: string;
  points: [string, string][];
};

export default function UpcommingCard({ title, points }: Props) {
  return (
    <div className="p-8 rounded-3xl bg-white my-4 w-[450px]">
      <h1 className="font-medium text-4xl text-primary-text py-2">{title}</h1>
      <div>
        {points.map((point, i) => (
          <div key={i} className="border-1-4 flex my-4">
            <Image
              src="/assets/icons/home/border.svg"
              width={4}
              height={4}
              alt="border"
            />
            <div className="ml-2">
              <p className="text-lg font-medium text-primary-text">
                {point[0]}
              </p>
              <p className="text-text text-sm">{point[1]}</p>
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <ViewAll title="View All" />
        </div>
      </div>
    </div>
  );
}
