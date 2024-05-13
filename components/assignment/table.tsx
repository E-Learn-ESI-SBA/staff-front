import { IAssignment } from "@/types/assignment";
import { DataTable } from "../common/table";
import { CustomColumns } from "@/components/assignment/collomns";
import { assignments } from "@/static/dummy-data/assignment/assignment";

export function AssignmentTable( {show} : {show : Boolean})  {
  return (
    <>
      <DataTable<IAssignment>
        data={assignments}
        headers={ show ?
           [
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


        ]
          :
         [
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
        ] }
        customColumns={[CustomColumns]}
        defaultFilter="title"
        fuzzyElements={["module_name"]}
      />
    </>
  );
}
