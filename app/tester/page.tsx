"use client";

import { FileForm } from "@/components/forms/file";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TesterPage() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="w-[725px]">
        <DialogHeader>
          <DialogTitle>Edit File </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you re done.
          </DialogDescription>
        </DialogHeader>
        <FileForm mode="CREATE">
          <DialogFooter
            className="flex w-full justify-between "
            style={{
              justifyContent: "space-between",
            }}
          >
            <DialogClose className="self-end">
              <Button>Cancel</Button>
            </DialogClose>
            <Button type="submit" className="w-fit p-4">
              Save
            </Button>
          </DialogFooter>
        </FileForm>
      </DialogContent>
    </Dialog>
  );
}
