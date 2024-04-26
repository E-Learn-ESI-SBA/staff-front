import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
  SelectContent,
} from "@radix-ui/react-select";
import { useState } from "react";
import { MessageCircleMore, NotebookPen, Star } from "lucide-react";

type TChartValues = {
  name: string;
  uv: number;
  pv: number;
  amt: number;
};

type TStateDate = {
  key: string;
  value: number;
};

type Props = {
  availableDates: TStateDate[];
  defaultDate: TStateDate;
  data: {
    [key: TStateDate["key"]]: {
      kind: "comments" | "quiz" | "review";
      name: string;
      description: string;
    }[];
  };
};
export function RecentActivity({ data, availableDates, defaultDate }: Props) {
  const [selectedDate, setSelectedDate] = useState<TStateDate>(defaultDate);

  return (
    <div className="flex p-4 flex-col">
      <div className="flex justify-between gap-4">
        <h4 className="text-lg font-semibold">Recent Activity</h4>
        <Select
          onValueChange={(v) => {
            setSelectedDate(availableDates.find((date) => date.key === v));
          }}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {availableDates.map((date, index) => (
                <SelectItem key={index} value={date.key}>
                  {date.value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        {data.hasOwnProperty(selectedDate.key) &&
          data[selectedDate.key].map((d, i) => (
            <div className="flex gap-2 p-2 items-start" key={i}>
              <span className="bg-orange-origin p-1 rounded-full">
                {d.kind === "comments" ? (
                  <MessageCircleMore className="w-3 h-3 text-white" />
                ) : d.kind === "quiz" ? (
                  <NotebookPen className="h-3 w-3 text-white" />
                ) : (
                  <Star className="h-3 w-3 text-white" />
                )}
              </span>
              <p className="text-sm text-gray-400">
                <span className="text-black">{d.name}</span> {d.description}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
