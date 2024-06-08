import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function TrialClass({
  src, title, description
}: { src: string, title: string, description: string}) {
  return (
    <div className="flex flex-row gap-8 rounded-2xl h-[22rem] p-12 justify-between bg-blue-300">
      <div>
        <h1 className="text-5xl text-secondary font-medium">
          {title}
        </h1>
        <p className="text-text py-8">
          {description}
        </p>
        <div className="flex flex-row justify-start gap-4 items-center">
          <Button className="rounded-full px-8 py-6 hover:bg-white hover:text-secondary hover:border hover:border-secondary">Visit Link</Button>
        </div>
      </div>
      <div className="bg-secondary-background w-96 rounded-2xl overflow-hidden">
        <Image src={src} width={500} height={500} alt="course" />
      </div>
    </div>
  );
}
