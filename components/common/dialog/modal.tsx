import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DialogContent, DialogOverlay } from "@/components/ui/dialog";

type Props = PropsWithChildren & {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};
export function ModalDialog({ open, onOpenChange, children }: Props) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogOverlay />
        <DialogContent className="p-6">{children}</DialogContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
