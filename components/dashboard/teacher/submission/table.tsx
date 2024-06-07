"use client"
import { ISubmission } from "@/types/quiz";
import { DataTable } from "../../../common/table";
import { CustomColumns } from "./colloms";
export function TeacherSubmissionTable({data} : { data : ISubmission[]}) {

  return (
    <> 
      <DataTable<ISubmission>
        data={data ?? []}
        url='http://localhost:3000/app/teacher/quizzes/submission'
        headers={[
          {
            accessorKey: "id",
            title: "ID",
          },
          {
            accessorKey: "student_id",
            title: "STUDENT ID",
          },
          {
            accessorKey: "grade",
            title: "GRADE",
          },
          {
            accessorKey: "score",
            title: "SCORE",
          },
        ]}
        customColumns={[CustomColumns]}
        defaultFilter="grade"
        fuzzyElements={["grade"]}
      />
    </>
  );
}
