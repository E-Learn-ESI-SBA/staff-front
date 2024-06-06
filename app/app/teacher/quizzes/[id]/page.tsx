import { cookies } from "next/headers";
import { quiz } from "@/static/dummy-data/quiz";
import Quiz from "@/components/dashboard/Quiz";

async function getQuiz(id: string) {
    const res = await fetch( `https://c27c-105-235-137-89.ngrok-free.app/assignments`,{
      method: "GET",
      cache : 'no-store',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("accessToken")?.value}`,
     }
   })

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

  return res.json()
  // return quiz;
}

export default async function SingleQuiz({
  params,
}: {
  params: { id: string };
}) {
  const data = await getQuiz(params?.id);
  console.log('dd',data)
  return <Quiz quiz={quiz} />;
}
