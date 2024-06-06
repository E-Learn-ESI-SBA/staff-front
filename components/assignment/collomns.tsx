"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { IAssignment } from "@/types/assignment";
import { Ping } from "../icons/ping";

export function CustomColumns(): ColumnDef<IAssignment> {
  return {
    accessorKey: "state",
    header: "State",
    cell: ({ row }: { row: Row<IAssignment> }) => {
      const deadline = new Date(row.original.deadline).getTime();
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
