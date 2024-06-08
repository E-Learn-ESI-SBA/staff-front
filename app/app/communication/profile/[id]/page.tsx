import ProfilePage from "@/components/communication/profile";
import Profile from "@/components/communication/profile";
import { cookies } from "next/headers";
const fake= {
  id: "1", 
  summary:
    "I am a passionate and experienced software engineer with a strong background in web development. I am skilled in a variety of programming languages and frameworks, and I have a proven track record of delivering high-quality, efficient code. I am a team player and I am always eager to learn new things.",
  image: "/assets/teacher.jpeg", 
  file: undefined,
  experiences: [
    {
      role: "Software Engineer",
      company: "Tech Company",
      start_date: "2020-01-01",
      end_date: "2023-12-31",
      description:
        "Developed and maintained web applications using React, Node.js, and Express. Designed and implemented scalable and efficient database solutions. Worked closely with cross-functional teams to deliver projects on time and within budget.",
    },
  ],
  projects: [
    {
      name: "E-commerce Website",
      start_date: "2022-05-01",
      end_date: "2022-08-31",
      description:
        "Developed a full-stack e-commerce website using React, Node.js, and MongoDB. Implemented features such as product search, shopping cart, and user authentication.",
    },
  ],
  awards: [
    {
      name: "Best Developer Award",
      event: "Tech Conference 2022",
      date: "2022-10-25",
      description: "Awarded for outstanding contribution to the development team.",
    },
  ],
  skills: [
    {
      name: "JavaScript",
      percentage: 90,
    },
    {
      name: "React",
      percentage: 85,
    },
    {
      name: "Node.js",
      percentage: 80,
    },
  ],
  other_skills: ["Git", "Linux", "Agile Methodology"],
  educations: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University Name",
      start_date: "2016-09-01",
      end_date: "2020-05-31",
      description: "lsdkklqsdnkdnqskl",
    },
  ],
};
async function getQuiz(id:string) {
  try {
    const res = await fetch(`http://localhost:8080/profiles/${id}`, {
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
    return;
  }
}

const Quizzes = async ({ params }: { params: { id: string } }) => {
  const data = await getQuiz(params?.id);

  return (

        <ProfilePage data={fake} />

  );
};

export default Quizzes;
