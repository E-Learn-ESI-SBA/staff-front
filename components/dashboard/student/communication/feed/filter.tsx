import {Flame, LucideIcon} from "lucide-react";
import { Rocket } from "lucide-react";
import { Sparkle } from "lucide-react";
import { ArrowUpFromDot } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Filter() {
  const [active, setActive] = useState("Best");

  return (
    <div className=" text-gray-thin flex flex-row  justify-between feed_border">
      <div className="flex flex-row items-center gap-6">
        <Item
          Icon={Rocket}
          text="Best"
          active={active == "Best"}
          onClick={setActive}
        />
        <Item
          Icon={Flame}
          text="Hot"
          active={active == "Hot"}
          onClick={setActive}
        />
        <Item
          Icon={Sparkle}
          text="New"
          active={active == "New"}
          onClick={setActive}
        />
        <Item
          Icon={ArrowUpFromDot}
          text="Top"
          active={active == "Top"}
          onClick={setActive}
        />
      </div>
      <div className="cursor-pointer">
        <ChevronDown className="h-8 w-8" />
      </div>
    </div>
  );
}

type Props = {
    Icon: LucideIcon;
    text: string;
    active: boolean;
    onClick: (text: string) => void;
    };

function Item({ Icon, text, active, onClick }:Props) {
  return (
    <div
      onClick={() => onClick(text)}
      className={`feed_filter_item ${active ? "text-blue-origin" : "text-gray-thin"}`}
    >
      <Icon className="h-8 w-8" color={`${active ? "#0066FF" : "#4E5566"}`} />
      <p>{text}</p>
    </div>
  );
}
