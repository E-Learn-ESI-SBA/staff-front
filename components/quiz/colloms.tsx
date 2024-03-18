"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { IQuiz } from "@/types/quiz";

export function CustomColumns(): ColumnDef<IQuiz> {
  return {
    accessorKey: "state",
    header: "State",
    cell: ({ row }: { row: Row<IQuiz> }) => {
    const color  = row.original.state === "ONGOING" ? "#FF9407"  : row.original.state === "UPCOMING" ? "#D80027"  : "#0F930F";
      return <div className="flex gap-2 items-center "
        style={{ color: color }}
      >
          <Ping color={color} />
          {row.original.state}
      </div>;
    },
  };
}

type Props = {
  color: string;
};
export function Ping({ color }: Props) {
  return (
    <span className="relative flex  h-3 w-3">
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full   opacity-75"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative inline-flex rounded-full h-3 w-3"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}
