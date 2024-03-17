"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { IQuiz } from "@/types/quiz";

export function CustomColumns(): ColumnDef<IQuiz> {
  return {
    accessorKey: "state",
    header: "",
    cell: ({ row }: { row: Row<IQuiz> }) => {
      return <div className="flex gap-2 ">
          {row.original.state}
          <Ping color={row.original.state === "ONGOING" ? "bg-orange-400"  : row.original.state === "UPCOMING" ? "bg-red-700"  : "bg-green-500"} />
      </div>;
    },
  };
}

type Props = {
  color: string;
};
export function Ping({ color }: Props) {
  return (
    <span className="relative flex h-3 w-3">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}
      ></span>
      <span
        className={`relative inline-flex rounded-full h-3 w-3 ${color}`}
      ></span>
    </span>
  );
}
