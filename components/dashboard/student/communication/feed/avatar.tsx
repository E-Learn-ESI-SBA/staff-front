import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";






export default function AvatarComponent({ src }: { src: string }) {
    return (
      <Avatar>
        <AvatarImage
          src={`${src && src == "default" ? "https://github.com/shadcn.png" : src}`}
          alt="Avatar"
          height={100}
          width={100}
          className="rounded-full"
        />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
  }