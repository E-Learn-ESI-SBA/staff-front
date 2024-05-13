"use client"
import { DataTable } from "@/components/common/table";
import { CustomColumns } from "./collomns";
import { results } from "@/static/dummy-data/assignment/results";

export function AssignmentResultTable()  {
const handleAddNote = (row) => {
  console.log('ee',row)
  };

const handleAddMark = (row) => {
  console.log('ee',row)
  };

  return (
    <div>
      <DataTable<any>
        data={results}
        headers={
           [
          {
            accessorKey: "id",
            title: "ID",
          },
          {
            accessorKey: "name",
            title: "Name",
          },
          {
            accessorKey: "marks",
            title: "marks",
          },
        ]
        }
        defaultFilter="name"
        customColumns={[CustomColumns]}
        fuzzyElements={["name"]}
     customOperations={[{ title: "add Note", handler: (row) => handleAddNote(row) },{ title: "add Mark", handler: (row) => handleAddMark(row) }]}
      />
    </div>

  );
}

