"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { IAssignment } from "@/types/assignment";
import { Ping } from "../icons/ping";

export function CustomColumns(): ColumnDef<IAssignment> {
  return {
    accessorKey: "state",
    header: "State",
    cell: ({ row }: { row: Row<IAssignment> }) => {
      const color =
        row.original.state === "ONGOING"
          ? "#FF9407"
          : row.original.state === "UPCOMING"
            ? "#D80027"
            : "#0F930F";
      return (
        <div className="flex gap-2 items-center " style={{ color: color }}>
          <Ping color={color} />
          {row.original.state}
        </div>
      );
    },
  };
}
