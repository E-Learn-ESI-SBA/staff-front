import { GraduationCap } from "lucide-react";

type education = {
  place: string;
  name: string;
  start_date: string;
  end_date: string;
  description: string;
};

const educations: education[] = [
  {
    place: "Rajasthan University",
    name: "MBA",
    start_date: "May 2016",
    end_date: "May 2019",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    place: "Rajasthan University",
    name: "MBA",
    start_date: "May 2016",
    end_date: "May 2020",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    place: "Rajasthan University",
    name: "MBA",
    start_date: "May 2016",
    end_date: "May 2021",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

export default function Education({data}:{data ?: education[]}) {
  console.log('edu',data)
  return (
    <div className="flex flex-col gap-4 border-t border-[#EAEAEA] py-4 ">
      <div className="flex justify-start items-center gap-2">
        <GraduationCap />
        <h1 className="text-[#121212] font-medium text-xl  ">Education</h1>
      </div>
      {data?.map((edc, i) => (
        <div className="flex flex-col gap-1 items-start" key={i}>
          <p className="text-[#121212] font-medium text-lg  ">{edc.place}</p>
          <p className=" text-[#807E7E] ">{edc.name} </p>
          <div className=" text-[#807E7E] text-sm ">
            <span>{edc.start_date}</span>-<span>{edc.end_date}</span>
          </div>
          <p className=" font-light text-sm text-black text-[#807E7E] ">
            {" "}
            {edc.description}
          </p>
        </div>
      ))}
    </div>
  );
}
