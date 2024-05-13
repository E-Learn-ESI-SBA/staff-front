import { PersonType } from "@/types/communication";
import Suggestions from "./suggestions";

export default function Right({
  className,
  data,
}: {
  className?: string;
  data: PersonType[];
}) {
  return (
    <div className={`text-blakc ${className} m-6`}>
      <Suggestions data={data} />
    </div>
  );
}
