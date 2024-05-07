"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Header<T> = {
  key: keyof T;
  label: string;
};
type Props<T> = {
  data: T[];
  withSearch?: boolean;
  filters: Header<T>[];
  setFilteredData: React.Dispatch<React.SetStateAction<T[]>>;
};
type FilterValues = {
  [key: string]: string;
};
export function Filter<T>({
  filters,
  withSearch,
  data,
  setFilteredData,
}: Props<T>) {
  // Search State
  const [search, setSearch] = useState<string>("");
  // const [selectedFilters,setSelectedFilters] = useState<Header<T>[]>([]);
  // Filter State
  const [filterValues, setFilterValues] = useState<FilterValues>(() => {
    const obj: FilterValues = {};
    filters.forEach((filter) => {
      obj[filter.key as string] = "none";
    });
    return obj;
  });
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch((_) => e.target.value);
  };
  const filterHandler = (key: string, value: string) => {
    setFilterValues((_) => {
      return {
        ...filterValues,
        [key]: value,
      };
    });
  };
  const SearchCmp = () => {
    return (
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search"
          className="pl-8"
          onChange={(e) => searchHandler(e)}
        />
      </div>
    );
  };
  const FilterSelector = ({ filter }: { filter: Header<T> }) => {
    return (
      <Select onValueChange={(v) => filterHandler(filter.key as string, v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`Select By ${filter.label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem key="none" value="none">
              None
            </SelectItem>
            {data.map((item) => (
              <SelectItem
                value={item[filter.key] as unknown as string}
                key={item[filter.key].toString()}
              >
                {item[filter.key] as unknown as ReactNode}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };

  // The function that will filter the data according to the search and filter values
  const dataFilterHandler = () => {
    let filteredData = data.filter((item) => {
      if (
        search !== "" &&
        !Object.values(item).some((val) =>
          val.toString().toLowerCase().includes(search.toLowerCase()),
        )
      ) {
        return false;
      }
      for (const key in filterValues) {
        if (filterValues[key] !== "none" && item[key] !== filterValues[key]) {
          return false;
        }
      }
      return true;
    });
    setFilteredData((_) => filteredData);
  };

  // The Ui
  return (
    <div className="flex items-start space-x-4 justify-between gap-4">
      <div className="grid  flex-1 grid-cols-3">
        {filters.map((filter) => (
          <FilterSelector key={filter.key.toString()} filter={filter} />
        ))}
      </div>
      <div className="flex items-center gap-4">
        {withSearch && <SearchCmp />}
        <Button onClick={dataFilterHandler} className="px-4 py-2  rounded-md">
          Filter
        </Button>
      </div>
    </div>
  );
}
