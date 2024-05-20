import { H3 } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { ResourceEnum, Section } from "@/types/chapter/courses";
import { FolderOpen, Pencil, Plus, Trash2 } from "lucide-react";
import { Resource } from "./resource";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {useModuleTreeStore} from "@/store/module/store";
import {EditModal} from "@/types/forms/state";

type Props = {
  section: Section;
  pathname: string;
  year:string
  index:number,
  parentIndex:number
};
export function SectionComponent({ section,parentIndex, pathname,year,index }: Props) {
  const {setSelectedSection,currentMap,setFormState} = useModuleTreeStore(state => ({
      setSelectedSection: state.setSelectedSection,
      currentMap: state.currentMap,
    setFormState: state.setFormState,
  }))
  const setAdd = (resourceType : ResourceEnum) => {
    currentMap.set("selectedSection",index)
    currentMap.set("selectedCourse",parentIndex)
      switch (resourceType) {
            case ResourceEnum.Video:
                setFormState(EditModal.ADD_VIDEO)
                break;
            case ResourceEnum.Lecture:
                setFormState(EditModal.ADD_LECTURE)
                break;
            case ResourceEnum.File:
                setFormState(EditModal.ADD_FILE)
                break;
        default :
            setFormState(EditModal.ADD_FILE)
      }


  }
  const setEdit = () => {
    setSelectedSection(section,{selectedCourse:parentIndex,selectedSection:index})
    setFormState(EditModal.EDIT_SECTION)
  }
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <H3 className="flex gap-2 text-base items-center">
          <FolderOpen width={16} height={16} className="text-text-GRAY" />
          Section :<span>{section.name}</span>
        </H3>
        <div className="flex gap-2 items-center">
          <DropdownMenu>
  <DropdownMenuTrigger>
          <Button variant="ghost">
            <Plus width={14} height={14} className="text-text-GRAY" />
          </Button>
  </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                  Select the Resource Type
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button variant="ghost" onClick={() => setAdd(ResourceEnum.File)} >
                      Create File
                  </Button>
                </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="ghost" onClick={() => setAdd(ResourceEnum.Video)} >
                  Create Video
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="ghost" onClick={() => setAdd(ResourceEnum.Lecture)} >
                  Create Lecture
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost">
            <Pencil width={14} height={14} className="text-black" onClick={setEdit} />
          </Button>
          <Button variant="ghost">
            <Trash2 width={14} height={14} className="text-red-origin" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {section.videos.map((v, i) => (
          <Resource
              grandParentIndex={parentIndex}
            parentIndex={index}
            key={i}
            currentPath={pathname}
            id={v.id}
            name={v.name}
            resourceType={ResourceEnum.Video}
            url={`${pathname}/video/${v.id}`}
            index={i}
          />
        ))}
        <Separator />
        {section.lectures.map((l, i) => (
          <Resource
              grandParentIndex={parentIndex}
              parentIndex={index}
            key={i}
            currentPath={pathname}
            id={l.id}
            name={l.content}
            url={`${pathname}/lecture/${l.id}`}
            resourceType={ResourceEnum.Lecture}
            index={i}

          />
        ))}
        <Separator />
        {section.files.map((f, i) => (
          <Resource
              grandParentIndex={parentIndex}
              parentIndex={index}
            key={i}
            currentPath={pathname}
            id={f.id}
            name={f.name}
            url={`${pathname}/file/${f.id}`}
            resourceType={ResourceEnum.File}
            index={i}

          />
        ))}
      </div>
    </div>
  );
}
