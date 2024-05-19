import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
  SelectContent,
} from "@radix-ui/react-select";
import { useState } from "react";
import { MessageCircleMore, NotebookPen, Star, StarHalf } from "lucide-react";
import {
  BarChart,
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StarIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";

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

type RecentActivityProps = {
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
export function RecentActivity({
  data,
  availableDates,
  defaultDate,
}: RecentActivityProps) {
  const [selectedDate, setSelectedDate] = useState<TStateDate>(defaultDate);

  return (
    <div className="flex p-4 flex-col text-gray-origin">
      <div className="flex justify-between gap-4">
        <h4 className="text-lg font-semibold text-black">Recent Activity</h4>
        <Select
          onValueChange={(v) => {
            setSelectedDate(
              (prev) => availableDates.find((date) => date.key === v) ?? prev,
            );
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
        <ScrollArea className="h-96">
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
        </ScrollArea>
      </div>
    </div>
  );
}

type SingleAreaProps = {
  availableDates: TStateDate[];
  defaultDate: TStateDate;
  data: {
    [key: TStateDate["key"]]: TChartValues[];
  };
};
export const SingleAreaChart = ({
  data,
  availableDates,
  defaultDate,
}: SingleAreaProps) => {
  const [selectedDate, setSelectedDate] = useState<TStateDate>(defaultDate);
  return (
    <div className="flex p-4 flex-col text-gray-origin w-full">
      <div className="flex justify-between gap-4">
        <h4 className="text-lg font-semibold text-black">Recent Activity</h4>
        <Select
          onValueChange={(v) => {
            setSelectedDate(
              (prev) => availableDates.find((date) => date.key === v) ?? prev,
            );
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
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={420}
          height={380}
          data={
            data.hasOwnProperty(selectedDate.key) ? data[selectedDate.key] : []
          }
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#564FFD" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#564FFD" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            strokeWidth="3"
            dataKey="pv"
            stroke="#564FFD"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
type BarChartProps = {
  availableDates: TStateDate[];
  defaultDate: TStateDate;
  average: number;
  description: string;
  data: {
    [key: TStateDate["key"]]: TChartValues[];
  };
};
export const BarChartComp = ({
  data,
  availableDates,
  description,
  defaultDate,
  average,
}: BarChartProps) => {
  const [selectedDate, setSelectedDate] = useState<TStateDate>(defaultDate);
  return (
    <div className="flex p-4 text-gray-origin flex-col w-full">
      <div className="flex justify-between gap-4">
        <h4 className="text-lg text-black font-semibold">Recent Activity</h4>
        <Select
          onValueChange={(v) => {
            setSelectedDate(
              (prev) => availableDates.find((date) => date.key === v) ?? prev,
            );
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
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={
            data.hasOwnProperty(selectedDate.key) ? data[selectedDate.key] : []
          }
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="pv" fill="#23BD33" background={{ fill: "#E1F7E3" }} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-1 p-4">
        <h4 className="text-lg font-semibold">Average: {average} </h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

type ReviewProps = {
  availableDates: TStateDate[];
  defaultDate: TStateDate;
  average: number;
  totalCount: number;
  details: {
    [n: number]: number;
  };
  data: {
    [key: TStateDate["key"]]: TChartValues[];
  };
};
export const ReviewChart = ({
  availableDates = [],
  defaultDate,
  data,
  details,
  totalCount,
  average,
}: ReviewProps) => {
  const START_NUMBER = [1, 2, 3, 4, 5];
  const [selectedDate, setSelectedDate] = useState<TStateDate>(defaultDate);
  return (
    <div className="flex p-4 text-gray-origin flex-col w-full">
      <div className="flex justify-between gap-4">
        <h4 className="text-lg text-black font-semibold">
          Overall Course Rating
        </h4>
        <Select
          onValueChange={(v) => {
            setSelectedDate(
              (prev) => availableDates.find((date) => date.key === v) ?? prev,
            );
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
      <div className="p-2 flex gap-2">
        <div className="flex flex-col bg-orange-light items-center justify-center p-6">
          <h5 className="font-bold text-2xl">{average}</h5>
          <div className="flex gap-px">
            {START_NUMBER.map((n) => {
              return n < Math.floor(average) ? (
                <StarIcon
                  className="h-3 w-3 text-[#FD8E1F] "
                  key={n}
                  fill="#FD8E1F"
                />
              ) : n + 0.5 <= average ? (
                <StarHalf
                  className="h-3 w-3 text-[#FD8E1F] "
                  key={n}
                  fill="#FD8E1F"
                />
              ) : (
                <StarIcon className="h-3 w-3 text-[#FD8E1F]" key={n} />
              );
            })}
          </div>
          <p className="text-xs text-black">Overall Rating</p>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={
              data.hasOwnProperty(selectedDate.key)
                ? data[selectedDate.key]
                : []
            }
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="pv" fill="#23BD33" background={{ fill: "#E1F7E3" }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col flex-col-reverse gap-1">
          {START_NUMBER.map((m) => (
            <div className="flex items-center justify-between gap-4" key={m}>
              <div className="flex items-center gap-1">
                {START_NUMBER.map((n) => (
                  <StarIcon
                    className="text-[#FD8E1F] w-4 h-4 "
                    fill={n <= m ? "#FD8E1F" : ""}
                    key={n}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">{m} Star</span>
              </div>
              <div className="flex flex-1 gap-1">
                <div className="w-full h-2 bg-gray-200 rounded ml-2">
                  <div
                    className="bg-orange-400 h-2 rounded"
                    style={{
                      width: `${details.hasOwnProperty(m) && details[m] / totalCount}`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {" "}
                  {details.hasOwnProperty(m) && details[m] / totalCount}{" "}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
