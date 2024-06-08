"use client"
import { ISubmission } from "@/types/quiz";
import { DataTable } from "../../../common/table";
import { CustomColumns } from "./colloms";
import { FRONT_BASE_URL } from "@/config/constants";
export function TeacherSubmissionTable({data} : { data : ISubmission[]}) {

  return (
    <> 
      <DataTable<ISubmission>
        data={data ?? []}
        url={`${FRONT_BASE_URL}/app/teacher/quizzes/submission`}
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
