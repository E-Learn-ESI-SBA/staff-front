import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> &
  PropsWithChildren;

export function TypographyP({ children, className, ...rest }: Props) {
  return (
    <p {...rest} className={cn("leading-7 ", className)}>
      {children}
    </p>
  );
}
