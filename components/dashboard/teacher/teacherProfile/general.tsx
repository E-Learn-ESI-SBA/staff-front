import { Teacher } from "@/types/teachers";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { UpdatePassword } from "../../student/studentProfile/updatePassword";


type Props = {
  teacher: any
}
const General = ({ teacher }: Props) => {
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 text-bold py-8">
        <Image
          src={teacher.user.avatar_url ? teacher.user.avatar_url : "/landing/testimonials/person.png"}
          alt="cs"
          width={0}
          height={0}
          sizes="100vw"
          className=" h-24 w-24  sm:h-32 sm:w-32  border-8 border-t-[#0066FF] border-r-[#0066FF] border-b-[#CCCCCC4D] border-l-[#CCCCCC4D] rounded-full p-2 "
        />
        <p className="text-2xl text-center">{teacher.user.first_name} {teacher.user.last_name}</p>
        {/* <p className="text-lg">1798 Points</p> */}
      </div>
      <div className="rounded-3xl  border-2 border-[#DADADA]  my-8 max-xl:mx-2  mx-auto flex flex-col px-8 items-center  md:grid md:grid-cols-2  xl:grid-cols-4 p-8   md:gap-x-4 gap-y-8 max-w-screen-xl ">
        <div className="flex flex-col items-start gap-4 col-span-2">
          <p className="text-xl font-semibold text-blue-origin">
            Personal Informations
          </p>
          <ul className="flex flex-col gap-4">
            <li className="flex justify-start items-baseline gap-2">
              <p className="font-bold">ID:</p>
              <p>{teacher.user.id}</p>
            </li>
            {/* <li className="flex justify-start flex-wrap items-baseline gap-1">
              <p className="font-bold">Academic Year:</p>
              <p>{teacher.year}-{teacher.group}</p>
            </li> */}
            <li className="flex justify-start items-baseline gap-2">
              <p className="font-bold">Gender:</p>
              <p>{teacher.user.gender}</p>
            </li>
            <li className="flex justify-start items-baseline gap-2">
              <p className="font-bold">State:</p>
              <p>{teacher.user.city}</p>
            </li>
            {/* <li className="flex justify-start items-baseline gap-2">
              <p className="font-medium">State:</p>
              <p>Sidi Bel Abbés</p>
            </li> */}
            {/* <li className="flex justify-start items-baseline gap-2">
              <p className="font-medium">Address:</p>
              <p className="">
                Plot no. 116, Lane number 4, Rathore nagar, Vaishali nagar ,
                Jaipur
              </p>
            </li> */}
          </ul>
        </div>
        <div className="flex flex-col self-start gap-4 col-span-1">
          <p className="text-xl font-semibold text-blue-origin ">
            Teacher Contact
          </p>
          <ul className="flex flex-col gap-4">
            <li className="flex justify-start items-center gap-2">
              {/* <Image
                src="/dashboard/profile/phone.svg"
                alt="cs"
                width={0}
                height={0}
                sizes="100vw"
                className=" h-4 w-4  sm:h-6 sm:w-6  "
              /> */}
              <Phone color="blue" />
              <p>{teacher.user.phone_number}</p>
            </li>
            <li className="flex justify-start items-center gap-1">
              {/* <Image
                src="/dashboard/profile/email.svg"
                alt="cs"
                width={0}
                height={0}
                sizes="100vw"
                className=" h-4 w-4  sm:h-6 sm:w-6  "
              /> */}
              <Mail color="blue" />
              <p className="">{teacher.user.email}</p>
            </li>
          </ul>
        </div>
        <div className="flex flex-col self-start gap-4 col-span-1">
          <p className="text-xl font-semibold text-blue-origin ">
            Connection Informations
          </p>
          <ul className="flex flex-col gap-4">
            <li className="flex justify-start items-baseline gap-2">
              <p className="font-bold">First access:</p>
              <p>Jun 6, 2024</p>
            </li>
            <li className="flex justify-start items-baseline gap-2">
              <p className="font-bold">Latest access:</p>
              <p>{formattedCurrentDate}</p>
            </li>
          </ul>
        </div>

      </div>
      <div className="flex justify-center items-center w-full py-8">
        <UpdatePassword />
        {/* <Button>Update Infos</Button> */}
      </div>
    </>
  );
};
export default General;
