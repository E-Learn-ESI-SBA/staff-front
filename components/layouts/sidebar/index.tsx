import React from "react";
import { SideBarItem } from "@/types";
import SideItem from "./sideItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

type Props = {
  role: "teacher" | "student";
  sideBarItems: SideBarItem[];
};
export const SideBar: React.FC<Props> = ({ role, sideBarItems }) => {
  return (
    <div className="top-0 left-0 relative w-80">
      <ScrollArea>

        <div className="w-80  z-50 left-0 fixed bg-blue-50   h-screen top-0  p-4">
        <div className="mb-16 flex items-center justify-start gap-2 border-b border-[#0066FF]">
          <div className="aspect-squarerounded-2xl text-[#0066FF]">
              <Image src={"/assets/logo.svg"} width={100} height={100} alt="logo" />
            </div>
            <div className="flex flex-col py-2  text-[#0066FF] ">
              <p className="font-bold text-3xl">{role}</p>
              <p className="font-medium">Dashboard</p>
            </div>
            {/* <Image src={"/icons/logo.svg"} width={150} height={150} alt="logo" /> */}
          </div>

          <div className="flex flex-col justify-between gap-4">
            {sideBarItems.map((item: SideBarItem, key: number) => (
              <SideItem
                icon={item.icon}
                url={item.url}
                label={item.label}
                key={key}
              />
            ))}
          </div>
          <div className="logout absolute bottom-8">
            <SideItem icon={"logout"} url={"/auth/logout"} label={"Log Out"} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};