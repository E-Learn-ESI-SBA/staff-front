"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ISubmission } from "@/types/quiz";
import { Ping } from "../../../icons/ping";

export function CustomColumns(): ColumnDef<ISubmission> {
  return {
    accessorKey: "is_passed",
    header: "IS PASSED",
    cell: ({ row }: { row: Row<ISubmission> }) => {

      return (
        <div className={`flex gap-2 items-center ${row.original.is_passed? 'text-[#0F930F]' : 'text-red-600'}`}>
          <Ping color={row.original.is_passed ? '#0F930F' : 'red'} />
          {row.original.is_passed? 'PASSED' : 'FAILED'}
        </div>
      );
    },
  };
}
