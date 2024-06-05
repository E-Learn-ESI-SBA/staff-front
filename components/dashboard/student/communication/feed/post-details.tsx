import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PostProps } from "@/types/communication";
import Item from "./item";
import { MessageSquare } from "lucide-react";



export default function PostDetails({ data }: { data: PostProps }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button>
                    <Item Icon={MessageSquare} text="comment" count={data.comments_count} />
                </button>
            </DialogTrigger>
            <DialogContent className=" max-w-screen-lg">
              <DialogHeader>
                <p className="h-8"></p>
              </DialogHeader>
                <div className="flex flex-row items-center justify-around">
                    <div className=" h-96 aspect-square bg-blue-500">

                    </div>
                    <div className=" h-96 aspect-square bg-red-500"></div>
                </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
    </Dialog>
    )
}