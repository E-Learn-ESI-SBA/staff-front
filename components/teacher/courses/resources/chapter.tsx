"use client";
import { Button } from "@/components/ui/button";
import { Folders, Pencil, Plus, Trash2 } from "lucide-react";
import { SectionComponent } from "./section";
import { Chapter } from "@/types/chapter/courses";
import { EditModal } from "@/types/forms/state";
import { useModuleTreeStore } from "@/store/module/store";

type Props = {
  chapter: Chapter;
  pathname: string;
  year: string;
  index: number;
};

export function ChapterComponent({ chapter, pathname, year, index }: Props) {
  const { setFormState, currentMap, setSelectedChapter } = useModuleTreeStore(
    (state) => ({
      setFormState: state.setFormState,
      formState: state.formState,
      setButtonLoading: state.setButtonLoading,
      buttonLoading: state.buttonLoading,
      setSelectedChapter: state.setSelectedChapter,
      currentMap: state.currentMap,
    }),
  );
  const setEdit = () => {
    setSelectedChapter(
      { name: chapter.name, description: chapter.description, id: chapter.id },
      { selectedCourse: index },
    );
    setFormState(EditModal.EDIT_CHAPTER);
  };
  const setAdd = () => {
    setFormState(EditModal.ADD_SECTION);
    currentMap.set("selectedCourse", index);
  };
  return (
    <div className="bg-secondary-background p-4 flex flex-col gap-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 text-lg items-center">
          <Folders width={24} height={24} className="text-text-GRAY" />
          <span>Chapter {chapter.order}:</span>
          <span>{chapter.name}</span>
        </div>
        <div className="flex gap-2  items-center">
          <Button variant="ghost" onClick={setAdd}>
            <Plus width={14} height={14} className="text-text-GRAY" />
          </Button>
          <Button variant="ghost" onClick={setEdit}>
            <Pencil width={14} height={14} className="text-black" />
          </Button>
          <Button variant="ghost">
            <Trash2 width={14} height={14} className="text-red-origin" />
          </Button>
        </div>
      </div>
      {chapter.sections.map((s, i) => (
        <SectionComponent
          key={i}
          section={s}
          pathname={pathname}
          year={year}
          index={i}
          parentIndex={index}
        />
      ))}
    </div>
  );
}
