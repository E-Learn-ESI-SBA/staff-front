// Card.tsx
import Image from "next/image";
import Ranking from "@/types/rank";

interface CardProps {
  student: Ranking;
  index: number;
}

const Card: React.FC<CardProps> = ({ student, index }) => {
  return (
    <div className="rounded-2xl h-fit px-8 py-4 text-white shadow-xl flex justify-between items-center bg-gradient-to-r from-[#4e94fe] via-[#3988ff] to-[#106fff]">
      <div className="flex items-center justify-start gap-4 sm:gap-8">
        <div
          className={` bg-center relative bg-no-repeat bg-contain p-4 ${index ? "bg-crown" : "bg-g-crown"} `}
        >
          <p className="text-center">{index + 1} </p>
        </div>
        <div className="flex justify-start items-center gap-2">
          <Image
            src={student.avatar_url ? student.avatar_url : "https://github.com/shadcn.png"}
            alt="student picture"
            width={0}
            height={0}
            sizes="100vw"
            className="w-16 h-16 rounded-full border-4 border-transparent"
          />
          <div className="flex flex-col">
            <p>{student.student}</p>
            <p className="opacity-50 text-xs">{student.promo}, {student.group}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2">
        <div className="rounded-full flex items-center justify-center bg-[#2f80fa] p-2">
          <Image
            src="/dashboard/leaderboard/trophy.svg"
            alt="trophy picture"
            width={0}
            height={0}
            sizes="100vw"
            className="w-8 h-8 "
          />
        </div>
        <div className="flex flex-col">
          <p className="font-medium">{student.total_points}</p>
          <p className="opacity-50 text-xs">Rewards</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
