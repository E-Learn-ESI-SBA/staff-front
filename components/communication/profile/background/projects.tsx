import { BriefcaseBusiness } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
type member = {
  image: string;
  link: string;
};

type project = {
  name: string;
  start_date: string;
  end_date: string;
  description: string;
  team_members: member[];
};

const projects: project[] = [
  {
    name: "Location Tracking App",
    start_date: "May 2016",
    end_date: "May 2016",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    team_members: [
      {
        image: "/assets/teacher.jpeg",
        link: "https://github.com",
      },
      {
        image: "/assets/teacher.jpeg",
        link: "https://github.com",
      },
      {
        image: "/assets/teacher.jpeg",
        link: "https://github.com",
      },
    ],
  },
  {
    name: "Location Tracking App",
    start_date: "May 2016",
    end_date: "May 2016",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    team_members: [
      {
        image: "/assets/teacher.jpeg",
        link: "https://github.com",
      },
      {
        image: "/assets/teacher.jpeg",
        link: "https://github.com",
      },
      {
        image: "/assets/teacher.jpeg",
        link: "https://github.com",
      },
    ],
  },
  {
    name: "Location Tracking App",
    start_date: "May 2016",
    end_date: "May 2016",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    team_members: [
      {
        image: "/assets/teacher.jpeg",
        link: "https://github.com",
      },
      {
        image: "/assets/teacher.jpeg",
        link: "https://github.com",
      },
      {
        image: "/assets/teacher.jpeg",
        link: "https://github.com",
      },
    ],
  },
];

export default function Projects({data}:{data ?: project[]}) {
  console.log('projects',data)
  return (
    <div className="flex flex-col gap-4 border-t border-[#EAEAEA] py-4 ">
      <div className="flex justify-start gap-2 items-center">
        <BriefcaseBusiness />
        <h1 className="text-[#121212] font-medium text-xl  ">Projects</h1>
      </div>
      
      {data?.map((project, i) => (
        <div className="flex flex-col gap-1 items-start" key={i}>
          <p className="text-[#3E3E59] font-medium text-lg  ">
            {" "}
            {project.name}
          </p>
          <div className=" font-light text-base text-[#807E7E] ">
            <span> {project.start_date}</span>-<span> {project.end_date}</span>
          </div>
          <p className=" font-light text-sm text-black text-[#807E7E] ">
            {" "}
            {project.description}
          </p>
        </div>
      ))}
    </div>
  );
}
