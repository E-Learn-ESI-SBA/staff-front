import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
};
export default function ViewAll({ title }: Props) {
  return (
    <div className="flex">
      <Link href={"/dashboard/student/tasks"} className="">
        <p className="text-primary font-medium">{title}</p>
      </Link>
      <Image
        src="/assets/icons/home/flash.svg"
        width={20}
        height={20}
        alt="arrow"
      />
    </div>
  );
}
