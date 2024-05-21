import EditorComp from "@/components/editor";
import { JSONContent } from "novel";

export function LectureTeacher() {
  const changeHandler = (e: JSONContent) => {
    console.log("Changed with value : ", e);
  };
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-3xl font-bold">Lecture Page</h1>
        <p className="text-lg">This is the lecture page</p>
      </div>
      <EditorComp usageMode="write" saveHandler={changeHandler} />
    </section>
  );
}
