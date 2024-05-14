import { Instructor } from "@/components/common/instructor";
import { H2 } from "@/components/common/typography";
import { TInstructor } from "@/types/staff";

type Props = {
  data: TInstructor[];
};
export default function InstructorsPage({ data }: Props) {
  return (
    <div className="flex flex-col gap-4 bg-secondary-background p-4">
      <H2 className="text-2xl">Instructors ({data.length}) </H2>
      {data.map((instructor, index) => (
        <Instructor key={index} {...instructor} />
      ))}
    </div>
  );
}
