import { TInstructor } from "@/types/staff";
import Image from "next/image";
import Link from "next/link";

type Props = TInstructor;

export const Instructor = ({ about, image, name, title, id }: Props) => {
  return (
    <Link
      className="flex gap-4 p-4 items-center rounded-2xl bg-white"
      href={`/user/${id}`}
    >
      <Image
        src={image}
        width={160}
        height={160}
        alt={name}
        className="rounded-full w-36 h-36"
      />
      <div className="flex flex-col flex-1 gap-4 p-2">
        <div className="flex gap-4  items-center">
          <div className="flex gap-1 flex-col">
            <h3 className="text-black text-lg font-bold ">{name}</h3>
            <p className="text-text-GRAY text-xs">{title}</p>
          </div>
        </div>
        <p className="text-sm font-light">{about}</p>
      </div>
    </Link>
  );
};
