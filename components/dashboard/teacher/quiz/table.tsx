"use client"
import { IQuiz } from "@/types/quiz";
import { DataTable } from "../../../common/table";
import { CustomColumns } from "./colloms";
import { FRONT_BASE_URL, MATERIAL_BASE_URL } from "@/config/constants";
import { useState } from "react";
import { toast } from "sonner";
import { useUserStore } from "@/store/user";
export function QuizTable({data} : { data : IQuiz[]}) {
  const { user } = useUserStore();
  const [quiz, setQuiz] = useState<IQuiz[]>(data);
  const deleteHandler = async (quiz : any) => {
    try {
    const res = await fetch(`${MATERIAL_BASE_URL}/quizes/${quiz.id}`,{
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${user?.accessToken}`,
       }
     })
     if(res.ok){
      //@ts-ignore
      setQuiz(prevQuiz => prevQuiz.filter(q => q.id != quiz.id))
      toast.success("quiz deleted successfully")
      return res.json()
     }else{
      toast.error("something went wrong")
      return res.json()
     }
    } catch (err: any) {
      toast.error("something went wrong")
      console.log(err.message)
      throw new Error(err.message)

    }
  }


  return (
    <> 
      <DataTable<IQuiz>
        data={quiz ?? [] }
        url={`${FRONT_BASE_URL}/app/teacher/quizzes`}
        deleteHandler={(quiz) => deleteHandler(quiz)}
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
            accessorKey: "year",
            title: "Year",
          },
          {
            accessorKey: "question_count",
            title: "Questions Count",
          },
        ]}
        customColumns={[CustomColumns]}
        defaultFilter="title"
        // fuzzyElements={["category", "module_name", "publisher"]}
      />
    </>
  );
}
