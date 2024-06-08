import {ISubmission } from "@/types/quiz";
import { DataTable } from "@/components/common/table";
import { CustomColumns } from "./colloms";
import { FRONT_BASE_URL } from "@/config/constants";

export function StudentSubmissionTable({data} : { data : ISubmission[]}) {
  return (
    <> 
      <DataTable<ISubmission>
        data={data ?? []}
        url={`${FRONT_BASE_URL}/app/student/quiz/submissions`}
        headers={[
          {
            accessorKey: "id",
            title: "ID",
          },
          {
            accessorKey: "quiz_id",
            title: "Quiz Id",
          },
          {
            accessorKey: "grade",
            title: "Grade",
          },
          {
            accessorKey: "score",
            title: "Score",
          },
        ]}
        customColumns={[CustomColumns]}
        defaultFilter="grade"
        fuzzyElements={["grade"]}
      />
    </>
  );
}
