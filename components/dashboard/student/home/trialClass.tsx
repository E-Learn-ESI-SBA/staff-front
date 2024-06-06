import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function TrialClass() {
  return (
    <div className="flex bg-white rounded-3xl h-[22rem] p-12 justify-between">
      <div>
        <h1 className="text-5xl text-secondary font-medium">
          Learn Python <br /> within 30 Days
        </h1>
        <p className="text-text py-8">
          Time to become advance then <br></br> others with this course{" "}
        </p>
        <div className="flex justify-between items-center">
          <Button className="rounded-full px-8 py-6 hover:bg-white border hover:text-secondary hover:border hover:border-secondary">Join Trial Class</Button>
          <Button className="bg-transparent text-text hover:bg-white border hover:text-secondary hover:border hover:border-cards-main border-transparent">Skipp</Button>
        </div>
      </div>
      <div className="bg-secondary-background w-96 rounded-2xl">
        <Image src="/assets/course.jpeg" width={500} height={500} alt="course" />
      </div>
    </div>
  );
}
