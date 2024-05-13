"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { IAssignment } from "@/types/assignment";
import Link from "next/link";
export function CustomColumns(): ColumnDef<IAssignment> {
  return {
    accessorKey: "file",
    header: "Attachments",
    cell: ({ row }: { row: Row<any> }) => {
      return (
        <Link
          href={row.original.file.url}
          target="_blank"
          className="px-4 py-1 border border-gray-400"
        >
          open
        </Link>
      );
    },
  };
}
