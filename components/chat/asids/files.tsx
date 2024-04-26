"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EFileType } from "@/types/messages";
import { ClassValue } from "clsx";
import {
  Download,
  FileBarChart2,
  FileCode,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { PropsWithChildren } from "react";
import { H2, H4 } from "@/components/common/typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TChatFile } from "@/types/messages";

type FileBoxProps = PropsWithChildren & {
  fileType: EFileType;
};
function FileBox({ children, fileType }: FileBoxProps) {
  return (
    <Button
      variant="ghost"
      className={`p-2 py-4 ${fileType === EFileType.IMAGE ? "bg-green-light" : fileType === EFileType.DOCUMENT ? "bg-blue-light" : fileType === EFileType.PDF ? "bg-red-light" : "bg-purple-light"}`}
    >
      {children}
    </Button>
  );
}

type BoxProps = TChatFile;
function Box({ fileType, name, size, url }: BoxProps) {
  const FileIcon = ({ className }: { className: ClassValue }) => {
    return fileType === EFileType.IMAGE ? (
      <ImageIcon className={cn("text-green-origin", className)} />
    ) : fileType === EFileType.DOCUMENT ? (
      <FileBarChart2 className={cn("text-blue-origin", className)} />
    ) : fileType === EFileType.PDF ? (
      <FileText className={cn("text-red-origin", className)} />
    ) : (
      <FileCode className={cn("text-purple-origin", className)} />
    );
  };
  return (
    <li className="flex gap-4 items-center w-full p-4 hover:bg-gray-light rounded-xl">
      <FileBox fileType={fileType}>
        <FileIcon className="w-8 h-8" />
      </FileBox>
      <span className="flex flex-col   flex-1">
        <H4 className="text-base font-bold">{name}</H4>
        <span className="text-sm">
          {fileType} {size}
        </span>
      </span>
      <a
        href={url}
        download
        className="p-1 rounded-lg relative w-fit h-fit border  border-purple-origin"
      >
        <Download className="w-5 h-5 text-purple-origin" />
      </a>
    </li>
  );
}

type Props = {
  files: BoxProps[];
};
export function FileAside({ files }: Props) {
  return (
    <aside className="max-w-80 min-w-52">
      <H2 className="text-lg font-bold">
        Files:{" "}
        <span className="p-1 bg-light-medium rounded-full">{files.length}</span>
      </H2>
      <ul className="max-h-[360px] overflow-y-scroll">
        <ScrollArea>
          {files.map((file, index) => (
            <Box key={index} {...file} />
          ))}
        </ScrollArea>
      </ul>
    </aside>
  );
}
