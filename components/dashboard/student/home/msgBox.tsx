import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MsgBox() {
  return (
    <div className="flex justify-between bg-gradient-to-br from-indigo-600 to-blue-600 opacity-80 max-w-[450px] p-8 items-center rounded-3xl">
      <div className="flex flex-col">
        <p className="text-lg">Discussion Box</p>
        <p className="font-bold text-2xl">3 New Messages</p>
      </div>
      <Link href="/dashboard/student/messages">
        <Image
          src={"/assets/icons/home/see.svg"}
          alt="icon"
          width={40}
          height={40}
        />
      </Link>
    </div>
  );
}
