import { QuizTable } from "@/components/dashboard/teacher/quiz/table";
import { MATERIAL_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";
import Link from "next/link";

async function getQuiz() {
  try {
    const res = await fetch(`${MATERIAL_BASE_URL}/quizes/teacher`, {
      method: "GET",
      cache: 'no-store',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("accessToken")?.value}`,
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Failed to fetch quizzes data:", err);
    return [];
  }
}

const Quizzes = async () => {
  const data = await getQuiz();
  console.log('dd', data);

  return (
    <div className="flex flex-col gap-8 p-4">
      <Link
        href="/app/teacher/quizzes/create"
        className="px-4 py-2 text-white bg-[#2C62EE] self-end rounded-lg"
      >
        + Add Quiz
      </Link>
        <QuizTable data={data} />
    </div>
  );
};

export default Quizzes;
