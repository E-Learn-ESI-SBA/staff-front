import Image from "next/image";

type Props = {
  image?: string;
  name: string;
  role: string;
  isFollowing: boolean;
  isFollowedBy: boolean;
};

const users: Props[] = [
  {
    image: "/assets/teacher.jpeg",
    name: "Vishnu Kumar Agrawa4",
    role: "Ux Designer at Divim Technology",
    isFollowing: true,
    isFollowedBy: true,
  },
  {
    image: "/assets/teacher.jpeg",
    name: "Vishnu Kumar Agrawa2",
    role: "Ux Designer at Divim Technology",
    isFollowing: true,
    isFollowedBy: false,
  },
  {
    image: "/assets/teacher.jpeg",
    name: "Vishnu Kumar Agrawal",
    role: "Ux Designer at Divim Technology",
    isFollowing: false,
    isFollowedBy: false,
  },
  {
    image: "/assets/teacher.jpeg",
    name: "Vishnu Kumar Agrawa3",
    role: "Ux Designer at Divim Technology",
    isFollowing: false,
    isFollowedBy: true,
  },
];

export default function Followers() {
  return (
    <ul>
      <p> {users.length} followers </p>
      {users.map((user, index) => (
        <li
          key={index}
          className="flex justify-between items-center border-b py-4"
        >
          <div className="flex justify-start gap-4">
            <Image
              src={user.image ?? "/store/img.jpg"}
              alt="profile pic"
              width={0}
              height={0}
              sizes="100vw"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-semibold text-lg">{user.name}</p>
              <p className="text-[#807E7E]">{user.role}</p>
            </div>
          </div>
          {user.isFollowedBy ? (
            <button className="text-[#D56A11] border border-[#D56A11] p-2 rounded-lg">
              Unfollow
            </button>
          ) : user.isFollowing ? (
            <button className="text-[#0066FF] border border-[#0066FF] p-2 rounded-lg">
              Follow Back
            </button>
          ) : (
            <button className="border border-black p-2 rounded-lg min-w-20">
              Follow
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
