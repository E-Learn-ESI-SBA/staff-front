import AlertError from "@/components/common/error";
import NoData from "@/components/common/no-data";
import SingleAssignemnt from "@/components/dashboard/student/studentProfile/assignment/SingleAssignment";
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
    console.error("Failed to fetch students data:", err);
    return { message: "error", error: err }
  }
}

async function getSubmission(id: string) {
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
  const submissiondata = await getSubmission(params?.id);

  return (
    <>
      {
        data.message === "error" ? <AlertError error={data.error} /> :
          <SingleAssignemnt assignment={data.message} submission={submissiondata?.submissions} />
      }
    </>
  )
}
