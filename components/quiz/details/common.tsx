import { PropsWithChildren } from "react";
import { H2, H3, H4, P } from "@/components/common/typography";
import { IQuiz } from "@/types/quiz";
import Image from "next/image";
import { numberToText } from "@/lib/utils";

type Props = PropsWithChildren & IQuiz;

export function QuizDetails({
  title,
  description,
  children,
  module_name,
  points,
  startDate,
  duration,
  image,
  attempts,
}: any) {
  return (
    <main className="layout-container">
      <div className="w-full h-full border-lg bg-white">
        <div className="flex flex-col gap-4">
          <H2 className="text-h2 text-typo-color-h2">{title}</H2>
          <P>Read the following instructions</P>
        </div>
        <div className="flex gap-4 items-start justify-between max-sm:flex-col">
          <Image src={image} alt={title} width={480} height={280} />
          <div className="flex flex-col gap-2 items-center">
            <Item title="Date" value={startDate} />
            <Item title="Time Limit" value={`${duration} Min`} />
            <Item title="Attempts" value={numberToText(attempts)} />
            <Item title="Points" value={`${points} Points`} />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <H3>Instructions</H3>
          <P>{description}</P>
        </div>
        {children}
      </div>
    </main>
  );
}
type TItem = {
  title: string;
  value: string;
};
const Item = ({ value, title }: TItem) => {
  return (
    <div className="flex gap-2">
      <H4 className="font-bold">{title}:</H4>
      <P>{value}</P>
    </div>
  );
};
