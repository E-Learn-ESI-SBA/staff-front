//@ts-nocheck
import { Profile } from "@/types";
import Awards from "./awards";
import Education from "./education";
import Experience from "./experience";
import Projects from "./projects";
import Skills from "./skills";
import Summary from "./summary";

export default function Background({data} : {data: Profile}) {
  return (
    <div className="flex flex-col gap-4">
      <Summary data={data.summary}  />
      <Experience data={data.experiences} />
      <Projects data={data.projects} />
      <Awards data={data.awards} />
      <Skills skills={data.skills} other_skills={data.other_skills} />
      <Education data={data.educations} />
    </div>
  );
}
