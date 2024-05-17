import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  tabs: {
    title: string;
    path: string;
  }[];
  activePath: string;
};
export const LinksTabs = ({ tabs, activePath }: Props) => {
  console.log(tabs);
  return (
    <div className="w-full grid grid-cols-4 relative ">
      {tabs.map((tab, index) => (
        <Link
          key={index}
          href={tab.path}
          className={cn(
            "text-text-GRAY p-4 px-8 text-center cursor-pointer",
            tab.path.startsWith(activePath) ? "border-b-4 border-blue-600" : "",
          )}
        >
          {tab.title}
        </Link>
      ))}
    </div>
  );
};
