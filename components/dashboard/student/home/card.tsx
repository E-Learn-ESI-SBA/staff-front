import { Button } from "@/components/ui/button";
import { Activity, Clock9, Cone } from "lucide-react";
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
      <Button className="rounded-full bg-secondary-background flex items-center justify-center w-16 h-16 mr-4 text-[#0066FF]">
        <Icon icon={icon} />
      </Button>

      <div className="flex flex-col">
        <p>{title}</p>
        <p className="text-secondary font-semibold text-2xl">{value}</p>
      </div>
    </div>
  );
}


interface IconProps {
  icon: any;
  [key: string]: any;
}

const icons: Record<string, React.ComponentType<any>> = {
  activity: Activity,
  time: Clock9,
}


const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
  const IconComponent = icons[icon] || Cone;
  return <IconComponent {...props} />;
};
