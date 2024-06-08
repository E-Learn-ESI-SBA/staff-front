'use client'
import { DataTable } from "@/components/common/table";
import { CustomColumns } from "./collomns";
import { results } from "@/static/dummy-data/assignment/results";
import { ASSIGNMENT_BASE_URL, FRONT_BASE_URL } from "@/config/constants";


type Submission = {
  id : string;
  file : string;
  grade : number,
  feedback : string;
  assignment_id:string;
  student_id : string;
  created_at : string;
  updated_at: string;
  evaluated_at : string;
}


export async function AssignmentResultTable({ data, assignmentId }: { data: Submission[]; assignmentId: string }) {
  
  const handleAddNote = (row:any) => {
    console.log("ee", row);
  };

  const handleAddMark = (row:any) => {
    console.log("ee", row);
  };
  return (
    <div>
      <DataTable<Submission>
        data={data}
        url={`${FRONT_BASE_URL}/app/teacher/assignment/${assignmentId}/submission`}
        headers={[
          {
            accessorKey: "student_id",
            title: "Student",
          },
          {
            accessorKey: "file",
            title: "file",
          },
          {
            accessorKey: "grade",
            title: "grade",
          },
          {
            accessorKey: "assignment_id",
            title: "assignment_id",
          },
        ]}
        defaultFilter="student_id"
        // customColumns={[CustomColumns]}
        customOperations={[
          { title: "add Note", handler: (row) => handleAddNote(row) },
          { title: "add Mark", handler: (row) => handleAddMark(row) },
        ]}
      />
    </div>
  );
}
