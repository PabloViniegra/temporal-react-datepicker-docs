import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

const CodeBlock = ({ children, className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "not-prose flex w-full flex-col overflow-hidden rounded-lg",
      "bg-[#0d0d0d] border border-[#1e1e1e]",
      "text-[#a1a1aa]",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

const CodeBlockHeader = ({ children, className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "not-prose flex h-9 items-center justify-between px-3 py-1.5",
      "border-b border-[#1e1e1e] bg-[#0a0a0a]",
      "text-xs text-[#52525b] font-mono",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

const CodeBlockGroup = ({ children, className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("flex items-center gap-2 text-xs text-[#52525b] font-mono", className)}
    {...props}
  >
    {children}
  </div>
);

const CodeBlockContent = ({ children, className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "overflow-x-auto bg-[#111111] font-mono text-sm leading-6 whitespace-pre",
      "p-4 text-[#a1a1aa]",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export { CodeBlock, CodeBlockHeader, CodeBlockGroup, CodeBlockContent };
