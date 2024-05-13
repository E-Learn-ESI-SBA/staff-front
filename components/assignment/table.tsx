import { IAssignment } from "@/types/assignment";
import { DataTable } from "../common/table";
import { CustomColumns } from "@/components/assignment/collomns";
import { assignments } from "@/static/dummy-data/assignment/assignment";

export function AssignmentTable() {
  return (
    <>
      <DataTable<IAssignment>
        data={assignments}
        headers={[
          {
            accessorKey: "id",
            title: "ID",
          },
          {
            accessorKey: "title",
            title: "Title",
          },
          {
            accessorKey: "module_name",
            title: "Module Name",
          },
          {
            accessorKey: "publisher",
            title: "Publisher",
          },
          {
            accessorKey: "startDate",
            title: "Start",
          },
          {
            accessorKey: "endDate",
            title: "End",
          },
          {
            accessorKey: "endDate",
            title: "End",
          },
          {
            accessorKey: "marks",
            title: "marks",
          },
        ]}
        customColumns={[CustomColumns]}
        defaultFilter="title"
        fuzzyElements={["module_name"]}
      />
    </>
  );
}
