import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

type Props = React.HTMLAttributes<HTMLHeadingElement>;

export const H1: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <h1
      {...props}
      className={cn(
        "scroll-m-20 children-4xl font-extrabold tracking-tight lg:children-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export const H2: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <h2
      {...props}
      className={cn(
        "scroll-m-20  pb-2 children-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const H3: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <h3
      {...props}
      className={cn(
        "scroll-m-20 children-2xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
};

export const H4: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <h4
      {...props}
      className={cn(
        "scroll-m-20  children-lg sm:children-xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h4>
  );
};
type TP = HTMLAttributes<HTMLHeadingElement> & {
  asParent?: boolean;
  children: ReactNode;
};
export const P: React.FC<TP> = ({
  children,
  asParent = false,
  className,
  ...props
}) => {
  if (typeof children !== "string")
    return (
      <div
        {...props}
        className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      >
        {children}
      </div>
    );
  return (
    <p
      {...props}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
    >
      {children}
    </p>
  );
};
