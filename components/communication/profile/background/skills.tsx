//@ts-nocheck
import { Percent, SquareCode } from "lucide-react";

type Skill = {
  name: string;
  percent: number;
};

type Props = {
  skills: Skill[];
  other_skills: string;
};

const profile_skills: Props = {
  skills: [
    {
      name: "Designing",
      percent: 80,
    },
    {
      name: "Programming",
      percent: 40,
    },
    {
      name: "HTML",
      percent: 60,
    },
    {
      name: "CSS",
      percent: 50,
    },
  ],
  other_skills: ["php", "Photoshop", "Photoshop", "Photoshop"],
};

export default function Skills({skills,other_skills}:{skills, other_skills ?: any}) {
  // export default function Skills({skills,other_skills}: Props) {
    console.log('skills',skills)
    console.log('other',other_skills)
  return (
    <div className="flex flex-col gap-4 border-t border-[#EAEAEA] py-4 ">
      <div className="flex justify-start items-center gap-2">
        <SquareCode />
        <h1 className="text-[#121212] font-medium text-xl  ">Skills</h1>
      </div>
      <div className="flex justify-start items-center gap-4">
        {skills?.map((skill, i) => (
          <div
            key={i}
            className="card flex flex-col items-center justify-center h-48 w-48 justify-start  "
          >
            <div className="percent relative">
              <svg width="120" height="120" className="relative">
                <circle cx="60" cy="60" r="55"></circle>
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  style={{ "--percent": skill.percentage }}
                ></circle>
              </svg>
              <p className="number absolute top-[50%] left-[50%] font-medium text-xl text-[#807E7E] ">
                {skill.percentage}
              </p>
            </div>
            <p className="text-[#807E7E] text-xl "> {skill.name} </p>
          </div>
        ))}
      </div>
      <p className="text-[#3E3E59] font-semibold text-lg  ">
        Vishnu also knows about
      </p>
      <ul className="flex justify-start items-center gap-4">
        {other_skills.map((skill, i) => (
          <li
            className="bg-[#A7A7A7] text-white p-2 rounded-lg text-xs "
            key={i}
          >
            {" "}
            {skill}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}
