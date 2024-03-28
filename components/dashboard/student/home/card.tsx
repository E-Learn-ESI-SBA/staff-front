import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  value: string;
  icon: string;
};
export default function Card({ title, value, icon }: Props) {
  return (
    <div className="flex justify-start bg-white rounded-3xl text-text w-[450px] p-4 items-center">
      <Button className="rounded-full bg-secondary-background flex items-center justify-center w-16 h-16 mr-4">
        <Image src={icon} alt="icon" width={25} height={25} />
      </Button>
      <div className="flex flex-col">
        <p>{title}</p>
        <p className="text-secondary font-semibold text-2xl">{value}</p>
      </div>
    </div>
  );
}
