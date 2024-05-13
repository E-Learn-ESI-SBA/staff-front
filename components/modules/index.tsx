"use client";
import { Filter } from "@/components/common/filter";
import { Module } from "@/types/chapter/courses";
import { useState } from "react";
import { ModuleCard } from "@/components/modules/card";
import { routes } from "@/config/routes";
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
      />
      <div className="flex gap-4 items-center justify-center">
        {filteredData.map((module, i) => (
          <Link
            key={i}
            href={
              routes.hasOwnProperty("teacher") &&
              `${routes["teacher"]["modules"].path}/${module.id}`
            }
          >
            <ModuleCard data={module} />
          </Link>
        ))}
      </div>
    </div>
  );
}
