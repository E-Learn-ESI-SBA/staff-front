import { IAssignment } from "@/types/assignment";
import { DataTable } from "../common/table";
import { CustomColumns } from "@/components/assignment/collomns";
import { assignments } from "@/static/dummy-data/assignment/assignment";

export function AssignmentTable({ show }: { show: Boolean }) {
  return (
    <>
      <DataTable<IAssignment>
        data={assignments}
        headers={
          show
            ? [
                {
                  accessorKey: "id",
                  title: "ID",
                },
                {
                  accessorKey: "title",
                  title: "Title",
                },
                {
                  accessorKey: "module",
                  title: "Module Name",
                },
                {
                  accessorKey: "teacher",
                  title: "Publisher",
                },
                {
                  accessorKey: "deadline",
                  title: "Deadline",
                },
              ]
            : [
                {
                  accessorKey: "id",
                  title: "ID",
                },
                {
                  accessorKey: "title",
                  title: "Title",
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
                  accessorKey: "deadline",
                  title: "Deadline",
                },
              ]
        }
        customColumns={[CustomColumns]}
        defaultFilter="title"
        fuzzyElements={["module"]}
      />
    </>
  );
}
