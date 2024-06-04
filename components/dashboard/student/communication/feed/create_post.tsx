'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Image as ImageIcon,
  Link,
  Settings2,
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ImageUpload from "./image-upload";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/config/firebase";
import { toast } from "sonner";
import { COMMUNICATION_BASE_URL, TEST_TOKEN } from "@/config/constants";

export default function CreatePost() {
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    header: "",
    body: "",
  });
  const [dialogOpen, setDialogOpen] = useState(true);
  
  const storeImage = async (file: any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log("hhhh", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        },
      );
    });
  };

  

  const postSchemaValidator = z.object({
    text: z.string().min(10, { message: "must be at least 10 characters long" }),
    header: z.string().min(5, { message: "must be at least 5 characters long" }),
  });

  type TPostSchema = z.infer<typeof postSchemaValidator>;

  const form = useForm<TPostSchema>({
    resolver: zodResolver(postSchemaValidator),
    defaultValues: {...formData},
  });


  const submit = async (data: any) => {
    try {
      // const urls = await Promise.all(files.map((file) => storeImage(file)));
      // console.log(urls);
      const reqData = {
        ...data,
        images: []
      }
      
      const res = await fetch(`${COMMUNICATION_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TEST_TOKEN}`
        },
        body: JSON.stringify(reqData),
      });

      if (res.ok) {
        console.log("Post created successfully");
        toast.success("Post created successfully");
        form.reset();
        setDialogOpen(false);
      }

    } catch (error) {
      console.log(error);
      toast.error("An error occured while submitting your post " + error);
    }
  }

  return (
    <div className="text-black flex gap-6 feed_border">
      <AvatarComponent />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild className="flex flex-row w-full justify-center items-center">
          <div className=" cursor-pointer">
            <input
              type="text"
              placeholder="what's on your mind?..."
              className="w-full border-none focus:outline-none focus:ring-0"
            />
            <ImageIcon className="h-8 w-8" color="gray" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px] text-black">
          <DialogHeader>
            <DialogTitle className="flex flex-row gap-6">
              <AvatarComponent />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">Pedro Duarte</h3>
                <p className="text-sm text-gray-400">@godsword</p>
              </div>
            </DialogTitle>
            {/* <DialogDescription>
                  </DialogDescription> */}
          </DialogHeader>
          <Form
            {...form} 
            // className="flex flex-col gap-4 pb-20"
            >
            <form
              onSubmit={form.handleSubmit(submit)}
              id="hehe"
            >
              <FormField
                control={form.control}
                name="header"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                    <Input 
                      placeholder="Header goes here" 
                      className="text-2xl font-bold focus-visible:ring-0"
                      {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                    <Textarea
                      placeholder="What do you want to talk about?"
                      className="resize-none text-base focus-visible:ring-0"
                      rows={3}
                      {...field}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* multiple image upload field goes here */}
              <ImageUpload files={files} setFiles={setFiles}/>
            </form>
          </Form>
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
              <Button
                type="submit" form="hehe" className="rounded-full text-xl px-8 py-6">
                Share
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
