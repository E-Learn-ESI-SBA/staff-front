import Image from "next/image";
type Props = {
  image?: string;
  name: string;
  year: string;
  city: string;
  isConnect: boolean;
  isFollowing: boolean;
};

const profile: Props = {
  image: "/assets/teacher.jpeg",
  name: "Hakim Maroc",
  year: "3CS",
  city: "Algeria",
  isConnect: false,
  isFollowing: false,
};

export default function Header() {
  // export default function Header({ image,name, year,city,isConnect,isFollowing }: Props) {
  return (
    <div>
      <div className=" bg-[#99c1fe] flex justify-start pl-4 py-4 gap-4 h-36 ">
        <Image
          src={profile.image ?? "/assets/teacher.jpeg"}
          alt="profile pic"
          width={0}
          height={0}
          sizes="100vw"
          className="w-32 h-32 rounded-full border-4 border-white mt-8  "
        />
        <div className="self-end">
          <p className="font-semibold"> {profile.name}</p>
          <p className="font-extralight text-sm"> {profile.year} student</p>
          <p className="text-sm"> {profile.city} </p>
        </div>
      </div>
      <ul className="flex justify-start float-right gap-2 items-center my-2 w-10/12">
        <li className="bg-[#0066FF] text-white p-2 rounded-lg hover:cursor-pointer text-xs ">
          {" "}
          {profile.isConnect ? "Disconnect" : "Connect"}
        </li>
        <li className=" text-[#0066FF] border border-[#0066FF] p-2 rounded-lg bg-white  hover:cursor-pointer text-xs ">
          Send a message
        </li>
        <li className=" text-[#0066FF] border border-[#0066FF] p-2  rounded-lg bg-white hover:cursor-pointer text-xs ">
          {profile.isFollowing ? "UnFollow" : "Follow"}
        </li>
      </ul>
    </div>
  );
}
