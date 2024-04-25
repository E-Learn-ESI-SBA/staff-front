import { Button } from "@/components/ui/button";
import { ResourceEnum } from "@/types/chapter/courses";
import { File, MonitorPlay, Pencil, Text, Trash2 } from "lucide-react";
import Link from "next/link";

type Props = {
  name: string;
  resourceType: ResourceEnum;
  currentPath: string;
  id: string;
  url: string;
};

export function Resource({ name, url, currentPath, resourceType, id }: Props) {
  switch (resourceType) {
    case ResourceEnum.Video:
      return (
        <Link
          href={`${url}`}
          className="flex justify-between w-full items-center"
        >
          <span className="flex gap-2 items-center">
            <MonitorPlay
              width={12}
              height={12}
              className="text-purple-origin"
            />
            <span>{name}</span>
          </span>
          <span className="flex gap-2 items-center">
            <Button variant="ghost">
              <Pencil width={14} height={14} className="text-black" />
            </Button>
            <Button variant="ghost">
              <Trash2 width={14} height={14} className="text-red-origin" />
            </Button>
          </span>
        </Link>
      );
    case ResourceEnum.Lecture:
      return (
        <Link
          href={`${currentPath}/lecture/${id}`}
          className="flex justify-between w-full items-center"
        >
          <span className="flex gap-2 items-center">
            <Text width={12} height={12} className="text-blue-origin" />
            <span>{name}</span>
          </span>
          <span className="flex gap-2 items-center">
            <Button variant="ghost">
              <Pencil width={14} height={14} className="text-black" />
            </Button>
            <Button variant="ghost">
              <Trash2 width={14} height={14} className="text-red-origin" />
            </Button>
          </span>
        </Link>
      );

    case ResourceEnum.File:
      return (
        <Link
          href={`${currentPath}/video/${id}`}
          className="flex justify-between w-full items-center"
        >
          <span className="flex gap-2 items-center">
            <File width={12} height={12} className="text-green-origin" />
            <span>{name}</span>
          </span>
          <span className="flex gap-2 items-center">
            <Button variant="ghost">
              <Pencil width={14} height={14} className="text-black" />
            </Button>
            <Button variant="ghost">
              <Trash2 width={14} height={14} className="text-red-origin" />
            </Button>
          </span>
        </Link>
      );
    default:
      return null;
  }
}
