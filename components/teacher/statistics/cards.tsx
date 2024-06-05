//@ts-nocheck
import {
  ClipboardList,
  CreditCard,
  MessageCircleQuestion,
  Play,
  SquareCheckBig,
  UsersRound,
} from "lucide-react";
import { PropsWithChildren } from "react";

type TData = {
  title: string;
  average: number;
};
type SingleCardProps = PropsWithChildren & {
  data: TData;
  color: string;
  lightColor: string;
};
function SingleCard({ data, lightColor, color, children }: SingleCardProps) {
  return (
    <div className="flex lg:p-6 w-ful items-center p-4 ">
      <div className={`${lightColor} p-2`}>{children}</div>
      <div className="flex flex-col justify-between gap-1">
        <h4 className="text-lg font-semibold">{data.average}</h4>
        <p className="text-sm text-gray-400">{data.title}</p>
      </div>
    </div>
  );
}

type Props = {
  data: TData[];
};
export function StateCards({ data }: Props) {
  const obj = {
    0: {
      icon: () => <Play className="w-6 h-6 text-orange-origin" />,
      color: "text-orange-origin",
      lightColor: "bg-orange-light",
    },
    1: {
      icon: () => <SquareCheckBig className="w-6 h-6 text-purple-origin" />,
      color: "text-purple-origin",
      lightColor: "bg-purple-light",
    },
    2: {
      icon: () => <UsersRound className="w-6 h-6 text-red-origin" />,
      color: "text-red-origin",
      lightColor: "bg-red-light",
    },
    3: {
      icon: () => <ClipboardList className="w-6 h-6 text-green-origin" />,
      color: "text-green-origin",
      lightColor: "bg-green-light",
    },
    4: {
      icon: () => (
        <MessageCircleQuestion className="w-6 h-6 text-blue-origin" />
      ),
      color: "text-blue-origin",
      lightColor: "bg-blue-light",
    },
    5: {
      icon: () => <CreditCard className="w-6 h-6 text-gray-origin" />,
      color: "text-gray-origin",
      lightColor: "bg-gray-light",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
      {data.map((d, i) => (
        <SingleCard
          key={i}
          data={d}
          lightColor={obj[i % 6].lightColor}
          color={obj[i % 6].color}
        >
          {obj[i % 6].icon()}
        </SingleCard>
      ))}
    </div>
  );
}
