import AlertError from "@/components/common/error";
import NoData from "@/components/common/no-data";
import SingleAssignment from "@/components/dashboard/teacher/assignments/SingleAssignment";
import { ASSIGNMENT_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";

async function getAssignment(id: string) {
  try {
    const res = await fetch(` ${ASSIGNMENT_BASE_URL}/assignments/${id}`, {
      method: "GET",
      cache: 'no-store',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("accessToken")?.value}`,
      }
    })
    if (!res.ok) {
      return { message: "error", error: res.json() }
    }
    return res.json()
  } catch (err) {
    return { message: "error", error: err }
  }


  // return quiz;
}

async function getSubmissions(id: string) {
  try {
    const res = await fetch(`${ASSIGNMENT_BASE_URL}/assignments/${id}/submissions`, {
      method: "GET",
      cache: 'no-store',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("accessToken")?.value}`,
      }
    })

    if (!res.ok) {
      return { message: "error", error: res }
    }
    return res.json()
  } catch (err) {
    return { message: "error", error: err }
  }

}

export default async function Assignment({
  params,
}: {
  params: { id: string };
}) {
  const data = await getAssignment(params?.id);
  const submissions = await getSubmissions(params?.id);
  console.log('dd', submissions.submissions)
  return (
    <>
      {
        data?.message == "error" || submissions?.message == "error" ? <AlertError error={data.error} /> :
          data?.message == null ? <NoData /> :
            <SingleAssignment assignment={data.message} submissions={submissions.submissions} />
      }</>
  )
}
