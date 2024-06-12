import { Bookmark } from "lucide-react";
import Item from "./item";
import { toast } from "sonner";
import { COMMUNICATION_BASE_URL } from "@/config/constants";
import { useState } from "react";
import { TPayload } from "@/types";




export default function PostSaveComponent({ saved, user, postId }: { saved: boolean, user: TPayload | null, postId: string }) {
    const [isSaved, setIsSaved] = useState<boolean>(saved);


    const handleSave = async () => {
        try {
          
          const res = await fetch(`${COMMUNICATION_BASE_URL}/posts/${postId}/save`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${user?.accessToken!}`,
            },
          });
    
          if (res.ok) {
            toast.success(`post ${isSaved ? 'unsaved' : 'saved'} successfully!`, {
              style: {
                backgroundColor: "green",
                color: "white",
              }
            });
            setIsSaved(!isSaved);
          } else {
            toast.error("something went wrong...", {
              style: {
                backgroundColor: "red",
                color: "white",
              }
            });
          }
        } catch (error) {
          toast.error("something went wrong...", {
            style: {
              backgroundColor: "red",
              color: "white",
            }
          });
        }
      }

    return (
        <Item
        Icon={Bookmark}
        text="save"
        className={`${isSaved ? ' fill-blue-500' : ''} hover:fill-blue-500`}
        color={`#3b82f6`}
        onClick={() => handleSave()}
        />
    )
}