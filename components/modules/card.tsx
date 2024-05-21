import Image from "next/image";
import { Module } from "@/types/chapter/courses";

type Props = {
  data: Module;
};
export const ModuleCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="rounded-2xl min-w-72 text-cards-main bg-white shadow-lg  ">
      <Image
        src="/store/img.jpg"
        alt="course picture"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-1/2 object-cover rounded-t-xl "
      />
      <div className="p-2 flex flex-col gap-y-8 ">
        <p className="text-lg font-semibold"> {data.name} </p>
        <div className="grid grid-cols-2 text-base  font-medium ">
          <p>Coéfficient {data.coefficient} </p>
          {data.speciality && <p> Speciality {data.speciality} </p>}
          <p> Semester {data.semester} </p>
          <p> Year {data.year} </p>
        </div>
      </div>
    </div>
  );
};
