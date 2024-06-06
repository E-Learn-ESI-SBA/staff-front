import SingleAssignment from "@/components/dashboard/teacher/assignments/SingleAssignment";
import { ASSIGNMENT_BASE_URL } from "@/config/constants";

async function getAssignment(id: string) {
  const res = await fetch( ` ${ASSIGNMENT_BASE_URL}/assignments/${id}`,{
    method: "GET",
    cache : 'no-store',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwMjY0NjU4LCJpYXQiOjE3MTc2NzI2NTgsImp0aSI6IjU4NDkyZjlkNDhhYTRhYmViY2U0Njk3YjViNWQxYzBjIiwiaWQiOiI3NWY1OWVjYy02OGVkLTQ4OTctOWMzMC1lYzdiYWFkYWIwYTkiLCJhdmF0YXIiOiJkZWZhdWx0IiwidXNlcm5hbWUiOiJmZW5kaTEiLCJlbWFpbCI6ImZlbmRpMUBnbWFpbC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImdyb3VwIjoiTm9uZSIsInllYXIiOiIxY3AifQ.s1FzH5zEsuxcZQgM5t4vcmdKyfXv7E746sYoR4gtL2Y`,
   }
 })

  if (!res.ok) {
    console.log('zz',res.json())
    throw new Error('Failed to fetch data')
  }

return res.json()
// return quiz;
}

async function getSubmissions(id: string) {
  const res = await fetch(`${ASSIGNMENT_BASE_URL}/assignments/${id}/submissions`,{
    method: "GET",
    cache : 'no-store',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwMjY0NjU4LCJpYXQiOjE3MTc2NzI2NTgsImp0aSI6IjU4NDkyZjlkNDhhYTRhYmViY2U0Njk3YjViNWQxYzBjIiwiaWQiOiI3NWY1OWVjYy02OGVkLTQ4OTctOWMzMC1lYzdiYWFkYWIwYTkiLCJhdmF0YXIiOiJkZWZhdWx0IiwidXNlcm5hbWUiOiJmZW5kaTEiLCJlbWFpbCI6ImZlbmRpMUBnbWFpbC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImdyb3VwIjoiTm9uZSIsInllYXIiOiIxY3AifQ.s1FzH5zEsuxcZQgM5t4vcmdKyfXv7E746sYoR4gtL2Y`,
   }
 })

  if (!res.ok) {
    console.log('zz',res.json())
    throw new Error('Failed to fetch data')
  }

return res.json()
// return quiz;
}

export default async function Assignment({
  params,
}: {
  params: { id: string };
}) {
  const data = await getAssignment(params?.id);
  const submissions = await getSubmissions(params?.id);
  console.log('dd',submissions.submissions)
  return <SingleAssignment assignment={data.message} submissions={submissions.submissions}  />;
}
