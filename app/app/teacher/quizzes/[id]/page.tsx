import { cookies } from "next/headers";
import { quiz } from "@/static/dummy-data/quiz";
import Quiz from "@/components/dashboard/Quiz";

async function getQuiz(id: string) {
    const res = await fetch( `https://c27c-105-235-137-89.ngrok-free.app/assignments`,{
      method: "GET",
      cache : 'no-store',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NTUxMzk3LCJpYXQiOjE3MTU5NTkzOTcsImp0aSI6IjYxN2EwNDU3MzNiNDQxNDlhNjY5Y2ZmMjkzOGQ3ZWFlIiwiaWQiOiIyMjNlYmU5Yi1jMWMyLTQ5M2EtYTdiYS02OThhOTM1NjdkYmUiLCJhdmF0YXIiOiJkZWZhdWx0IiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AaG9zdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJncm91cCI6Ik5vbmUiLCJ5ZWFyIjoiTm9uZSJ9.2UFOb8hOBkfnGpWHgkQdJcnbK6YwqbEtn9aIFA-FNBc`,
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
