"use client";
import { Filter } from "@/components/common/filter";
import { Module } from "@/types/chapter/courses";
import { Dispatch, SetStateAction, useState } from "react";
import { ModuleCard } from "@/components/modules/card";
import appRouter from "@/config/routes";
import Link from "next/link";

type Props = {
  data: Module[];
};
export default function ModulesPage({ data }: Props) {
  const [filteredData, setFilteredData] = useState<Module[]>(data);
  return (
    <div className="flex flex-col p-4 overflow-hidden  gap-8">
      <Filter
        data={data}
        filters={[
          {
            label: "Year",
            key: "year",
          },
          {
            label: "Semester",
            key: "semester",
          },
        ]}
        setFilteredData={setFilteredData}
        withSearch
      />
      <div className="grid gap-8 gridview">
        {filteredData.map((module, i) => (
          <Link
            key={i}
            href={
              appRouter.getPath("module") &&
              appRouter.getPath("module").concat("/", module.id!)
            }
            className="hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <ModuleCard data={module} />
          </Link>
        ))}
      </div>
    </div>
  );
}
