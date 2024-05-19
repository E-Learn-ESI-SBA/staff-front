import { cookies } from "next/headers";
import { quiz } from "@/static/dummy-data/quiz";
import Quiz from "@/components/dashboard/Quiz";

async function getQuiz(id: string) {
  //   const res = await fetch( `quiz/${id}`,{
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${cookies().get("token")}`,
  //    }
  //  })

  //   if (!res.ok) {
  //     throw new Error('Failed to fetch data')
  //   }

  // return res.json()
  return quiz;
}

export default async function UpdateQuiz({
  params,
}: {
  params: { id: string };
}) {
  const data = await getQuiz(params?.id);

  return <Quiz quiz={data} />;
}
