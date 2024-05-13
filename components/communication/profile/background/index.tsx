import Awards from "./awards";
import Education from "./education";
import Experience from "./experience";
import Projects from "./projects";
import Skills from "./skills";
import Summary from "./summary";

export default function Background() {
  return (
    <div className="flex flex-col gap-4">
      <Summary />
      <Experience />
      <Projects />
      <Awards />
      <Skills />
      <Education />
    </div>
  );
}
