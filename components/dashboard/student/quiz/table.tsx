import { IQuiz } from "@/types/quiz";
import { DataTable } from "@/components/common/table";
import { CustomColumns } from "./colloms";
import { FRONT_BASE_URL } from "@/config/constants";

export function QuizTable({data} : { data : IQuiz[]}) {
  return (
    <> 
      <DataTable<IQuiz>
        data={data ?? []}
        url={`${FRONT_BASE_URL}/app/student/quiz`}
        headers={[
          {
            accessorKey: "id",
            title: "ID",
          },
          {
            accessorKey: "title",
            title: "Quiz Title",
          },
          {
            accessorKey: "start_date",
            title: "Start",
          },
          {
            accessorKey: "end_date",
            title: "End",
          },
          {
            accessorKey: "duration",
            title: "Duration",
          },
          {
            accessorKey: "question_count",
            title: "Questions Count",
          },
        ]}
        customColumns={[CustomColumns]}
        defaultFilter="title"
        fuzzyElements={["title","question_count"]}
      />
    </>
  );
}
