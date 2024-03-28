import { H2, H4 } from "@/components/common/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type Member = {
  name: string;
  title: string;
  image: string;
};
type Props = {
  members: Member[];
};
export function MemberAside({ members }: Props) {
  return (
    <aside className="flex flex-col gap-4">
      <H2 className="text-base">
        Members: <span className="p-1 bg-light-medium">{members.length}</span>
      </H2>
      <ul className="flex gap-2 p-2 max-h-[420px]">
        <ScrollArea>
          {members.map((member, index) => (
            <Box key={index} member={member} />
          ))}
        </ScrollArea>
      </ul>
    </aside>
  );
}

type BoxProps = {
  member: Member;
};
function Box({ member: { image, name, title } }: BoxProps) {
  return (
    <div className="flex gap-2">
      <Avatar className="w-12 h-12 rounded-lg">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>ESI</AvatarFallback>
      </Avatar>
      <div className="flex gap-1">
        <H4 className="text-base font-bold">{name}</H4>
        <span className="text-xs text-li">{title}</span>
      </div>
    </div>
  );
}
