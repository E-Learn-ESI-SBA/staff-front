import { Button } from "@/components/ui/button";
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
        <div>
          <Button className="rounded-full px-8 py-6">Join Trial Class</Button>
          <Button className="bg-transparent text-text">Skipp</Button>
        </div>
      </div>
      <div className="bg-secondary-background w-96 rounded-2xl"></div>
    </div>
  );
}
