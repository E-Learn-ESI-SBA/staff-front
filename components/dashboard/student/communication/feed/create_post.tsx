import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Image,
  Link,
  Youtube,
  Paperclip,
  Settings2,
  ChevronDown,
  ChevronDownIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreatePost() {
  return (
    <div className="text-black flex flex-row items-center gap-6 feed_border">
      <AvatarComponent />
      <Dialog>
        <DialogTrigger asChild>
          <input
            type="text"
            placeholder="what's on your mind?..."
            className="w-full border-none focus:outline-none focus:ring-0"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px] text-black">
          <DialogHeader>
            <DialogTitle className="flex flex-row gap-6">
              <AvatarComponent />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">Pedro Duarte</h3>
                <p className="text-sm text-gray-400">@peduarte</p>
              </div>
            </DialogTitle>
            {/* <DialogDescription>
                  </DialogDescription> */}
          </DialogHeader>
          <div className="flex flex-col gap-4 pb-20">
            <Textarea
              placeholder="What do you want to talk about?"
              className="resize-none text-2xl focus-visible:ring-0"
              rows={6}
            />
            <div className="flex flex-row gap-8 items-center">
              <Item Icon={Image} />
              <Item Icon={Youtube} />
              <Item Icon={Link} />
              <Item Icon={Settings2} />
            </div>
          </div>
          <DialogFooter>
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-row gap-2 items-center">
                <Select>
                  <SelectTrigger className="w-[200px] focus-visible:ring-0 focus:ring-0 border-gray-400 text-black text-lg">
                    <SelectValue
                      defaultValue="public"
                      className="font-bold"
                      placeholder="Public"
                    />
                  </SelectTrigger>
                  <SelectContent className="focus-visible:ring-0 border-gray-thin">
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Only Followers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="rounded-full text-xl px-8 py-6">
                Share
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Image className="h-8 w-8" color="gray" />
      <Paperclip className="h-8 w-8" color="gray" />
    </div>
  );
}

function AvatarComponent() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="Avatar"
        height={60}
        width={60}
        className="rounded-full"
      />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
}

function Item({ Icon, func }: { Icon: any; func?: any }) {
  return (
    <div className="flex flex-row items-center cursor-pointer">
      <Icon className="h-8 w-8" color="gray" />
    </div>
  );
}
