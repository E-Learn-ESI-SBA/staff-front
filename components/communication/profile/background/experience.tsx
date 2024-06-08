import { UserSearch } from "lucide-react";

type experience = {
  role: string;
  name: string;
  start_date: string;
  end_date: string;
  description: string;
};

const experiences: experience[] = [
  {
    role: "Ux Designer",
    name: "Divim Technology",
    start_date: "May 2016",
    end_date: "May 2016",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    role: "Web Designer",
    name: "Divim Technology",
    start_date: "May 2016",
    end_date: "May 2016",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    role: "Web Designer",
    name: "Divim Technology",
    start_date: "May 2016",
    end_date: "May 2016",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

export default function Experience({data}:{data ?: experience[]}) {
  console.log('exp',data)
  return (
    <div className="flex flex-col gap-4 border-t border-[#EAEAEA] py-4 ">
      <div className="flex justify-start gap-2 items-center">
        <UserSearch />
        <h1 className="text-[#121212] font-medium text-xl  ">Experience</h1>
      </div>
      {data?.map((exp, i) => (
        <div className="flex flex-col gap-1 items-start" key={i}>
          <p className="text-[#121212] font-medium text-lg  ">{exp.role}</p>
          <p className=" text-[#807E7E] "> {exp.name}</p>
          <div className=" font-light text-sm text-[#807E7E] ">
            <span> {exp.start_date}</span>-<span> {exp.end_date}</span>
          </div>
          <p className=" font-light text-sm text-black text-[#807E7E] ">
            {" "}
            {exp.description}
          </p>
        </div>
      ))}
    </div>
  );
}
