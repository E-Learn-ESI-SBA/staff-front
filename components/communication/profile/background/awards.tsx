import { Trophy } from "lucide-react";

type award = {
  category: string;
  name: string;
  date: string;
  description: string;
};

const awards: award[]  = [
  {
    category: "Art Direction",
    name: "2013 MIDAS Awards",
    date: "May 2016",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
  },
  {
    category: "Art Direction",
    name: "2013 MIDAS Awards",
    date: "May 2016",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
  },
  {
    category: "Art",
    name: "2013 MIDAS Awards",
    date: "May 2016",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
  },
];

export default function Awards({data}:{data ?: award[]}) {
  console.log('award',data)
  return (
    <div className="flex flex-col gap-4 border-t border-[#EAEAEA] py-4 ">
      <div className="flex justify-start  gap-2 items-center">
        <Trophy />
        <h1 className="text-[#121212] font-medium text-xl  ">
          Honers & Awards
        </h1>
      </div>

      {data?.map((award, i) => (
        <div className="flex flex-col gap-1 items-start" key={i}>
          <p className="text-[#121212] font-medium text-lg  ">
            {" "}
            {award.category}
          </p>
          <p className=" text-[#807E7E] "> {award.name}</p>
          <p className=" text-[#807E7E] text-sm "> {award.date}</p>
          <p className=" font-light text-sm text-black text-[#807E7E] ">
            {award.description}
          </p>
        </div>
      ))}
    </div>
  );
}
