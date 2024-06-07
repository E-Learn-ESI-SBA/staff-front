import AlertError from "@/components/common/error";
import NoData from "@/components/common/no-data";
import SingleSubmission from "@/components/dashboard/teacher/submission";
import { ASSIGNMENT_BASE_URL } from "@/config/constants";
import { error } from "console";
import { cookies } from "next/headers";


async function getSubmission(id: string, sub: string) {
  try {
    const res = await fetch(`${ASSIGNMENT_BASE_URL}/assignments/${id}/submissions/${sub}`, {
      method: "GET",
      cache: 'no-store',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("accessToken")?.value}`,
      }
    })
    const response = await res.json()
    if (!res.ok) {
      return { message: "error", errror: response }
    }
    return response
  } catch (err) {
    return { message: "error", error: err }
  }
}

export default async function Assignment({
  params,
}: {
  params: { id: string; sub: string };
}) {
  const data = await getSubmission(params?.id, params?.sub);
  console.log('sss', data)
  return (
    <>
      {data.message == "error" ? <AlertError error={data.error} />
        : data.submission ?
          <SingleSubmission submission={data.submission} />
          :
          <NoData />
      }
    </>
  )
}

