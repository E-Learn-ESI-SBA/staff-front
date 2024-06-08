import { Button } from "@/components/ui/button";
import { ResourceEnum } from "@/types/chapter/courses";
import {
  File,
  LucideIcon,
  MonitorPlay,
  Pencil,
  Text,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useModuleTreeStore } from "@/store/module/store";
import { EditModal } from "@/types/forms/state";
import { fromStringGroupToOptions } from "@/utils/utils";

type Props = {
  name: string;
  resourceType: ResourceEnum;
  currentPath: string;
  id: string;
  url: string;
  index: number;
  grandParentIndex: number;
  parentIndex: number;
  groups: string[];
};
export function Resource({
  name,
  groups,
  url,
  currentPath,
  resourceType,
  id,
  parentIndex,
  grandParentIndex,
  index,
}: Props) {
  const { setSelectedResource, currentMap, setFormState } = useModuleTreeStore(
    (state) => ({
      setFormState: state.setFormState,
      currentMap: state.currentMap,
      setSelectedResource: state.setSelectedResource,
    }),
  );

  const setEdit = () => {
    setSelectedResource(
      resourceType,
      { id, name, url, groups: fromStringGroupToOptions(groups) },
      {
        selectedCourse: grandParentIndex,
        selectedSection: parentIndex,
        selectedResource: index,
      },
    );
    switch (resourceType) {
      case ResourceEnum.Video:
        setFormState(EditModal.EDIT_VIDEO);
        break;
      case ResourceEnum.Lecture:
        setFormState(EditModal.EDIT_LECTURE);
        break;
      case ResourceEnum.File:
        setFormState(EditModal.EDIT_FILE);
        break;
      default:
        setFormState(EditModal.EDIT_FILE);
    }
  };
  const ResourceItem = ({
    href,
    name,
    Icon,
    RType,
  }: {
    href: string;
    name: string;
    Icon: LucideIcon;
    RType: ResourceEnum;

  }) => (
    <div className="flex justify-between w-full items-center">
      <Link href={href}>
        <span className="flex gap-2 items-center">
          <Icon width={12} height={12} className={RType === ResourceEnum.Lecture ? "text-blue-origin" : RType === ResourceEnum.File ? "text-green-origin" : RType === ResourceEnum.Video ? "text-purple-origin": "text-text-GRAY"} />
          <span>{name}</span>
        </span>
      </Link>
      <span className="flex gap-2 items-center">
        <Button variant="ghost" onClick={setEdit}>
          <Pencil width={14} height={14} className="text-black" />
        </Button>
        <Button variant="ghost">
          <Trash2 width={14} height={14} className="text-red-origin" />
        </Button>
      </span>
    </div>
  );

  const resourceConfig = {
    [ResourceEnum.Video]: {
      href: `${url}`,
      Icon: MonitorPlay,
      color: "text-purple-origin",
      RType: ResourceEnum.Video
    },
    [ResourceEnum.Lecture]: {
      href: `${currentPath}/lecture/${id}`,
      Icon: Text,
      color: "text-blue-origin",
      RType: ResourceEnum.Lecture,
    },
    [ResourceEnum.File]: {
      href: `${currentPath}/video/${id}`,
      Icon: File,
      color: "text-green-origin",
        RType: ResourceEnum.File,
    },
    [ResourceEnum.Note]: {
      href: `${currentPath}/note/${id}`,
      Icon: File,
      color: "text-green-origin",
        RType: ResourceEnum.Note,
    },
  };

  const { href, Icon, color ,RType} = resourceConfig[resourceType] || {};

  if (!href || !Icon || !color) return null;

  return <ResourceItem href={href} name={name} Icon={Icon} RType={RType} />;
}
