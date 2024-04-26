import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
  SelectContent,
} from "@radix-ui/react-select";
import { useState } from "react";
import { MessageCircleMore, NotebookPen, Star} from "lucide-react";
import {BarChart,Area, AreaChart, Bar, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

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
export function RecentActivity({ data, availableDates, defaultDate }: RecentActivityProps) {
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

type SingleAreaProps=  {
  availableDates: TStateDate[];
    defaultDate: TStateDate;
    data: {
      [key: TStateDate["key"]]: TChartValues[];
    };
}
export const SingleAreaChart = ({ data ,availableDates,defaultDate}: SingleAreaProps) => {
  const [selectedDate, setSelectedDate] = useState<TStateDate>(defaultDate);
  return (
      <div className="flex p-4 flex-col w-full">
        <div className="flex justify-between gap-4">
          <h4 className="text-lg font-semibold">Recent Activity</h4>
          <Select
              onValueChange={(v) => {
                setSelectedDate(availableDates.find((date) => date.key === v));
              }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Range"/>
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
            <AreaChart width={420} height={380} data={data.hasOwnProperty(selectedDate.key) ? data[selectedDate.key] : []}
                       margin={{top: 10, right: 30, left: 0, bottom: 0}}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#564FFD" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#564FFD" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Area type="monotone" strokeWidth="3" dataKey="pv" stroke="#564FFD" fillOpacity={1} fill="url(#colorPv)"/>
            </AreaChart>
          </ResponsiveContainer>
      </div>
  )
}
type BarChartProps = {
  availableDates: TStateDate[];
    defaultDate: TStateDate;
    average: number;
    description: string;
    data: {
      [key: TStateDate["key"]]: TChartValues[];
    };
}
export const BarChartComp = ({ data, availableDates,description,defaultDate,average}: BarChartProps) => {
  const [selectedDate, setSelectedDate] = useState<TStateDate>(defaultDate);
  return (
      <div className="flex p-4 flex-col w-full">
        <div className="flex justify-between gap-4">
          <h4 className="text-lg font-semibold">Recent Activity</h4>
          <Select
              onValueChange={(v) => {
                setSelectedDate(availableDates.find((date) => date.key === v));
              }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Range"/>
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
              data={data.hasOwnProperty(selectedDate.key) ? data[selectedDate.key] : []}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
          >
            <XAxis dataKey="name" scale="point" padding={{left: 10, right: 10}}/>
            <YAxis/>
            <Tooltip/>
            <Legend />
            <CartesianGrid strokeDasharray="3 3"/>
            <Bar dataKey="pv" fill="#8884d8" background={{fill: '#eee'}}/>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-1 p-4">
            <h4 className="text-lg font-semibold">Average: {average} </h4>
            <p className="text-sm text-gray-600">
              {description}
            </p>
        </div>
      </div>
  )
}


