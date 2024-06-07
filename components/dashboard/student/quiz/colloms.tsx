"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { IQuiz } from "@/types/quiz";
import { Ping } from "@/components/icons/ping";

export function CustomColumns(): ColumnDef<IQuiz> {
  return {
    accessorKey: "state",
    header: "State",
    cell: ({ row }: { row: Row<IQuiz> }) => {
      const deadline = new Date(row.original.end_date).getTime();
      const now = Date.now();
      const isOngoing = deadline > now;

      return (
        <div className={`flex gap-2 items-center ${isOngoing ? 'text-[#FF9407]' : 'text-[#0F930F]'}`}>
          <Ping color={isOngoing ? '#FF9407' : '#0F930F'} />
          {isOngoing ? 'ONGOING' : 'FINISHED'}
        </div>
      );
    },
  };
}
