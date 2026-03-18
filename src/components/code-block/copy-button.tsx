"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/utils/cn";
import { copyToClipboard } from "@/utils/copy";

interface CopyButtonProps {
  content: string;
  iconSize?: number;
  className?: string;
}

export function CopyButton({ content, iconSize = 13, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
      className={cn(
        "flex items-center justify-center rounded p-1",
        "text-[#52525b] transition-colors duration-150",
        "hover:text-[#a1a1aa] hover:bg-[#1a1a1a]",
        "focus-visible:outline-2 focus-visible:outline-[#fafafa] focus-visible:outline-offset-2",
        className,
      )}
    >
      {copied
        ? <Check size={iconSize} className="text-[#71717a]" />
        : <Copy size={iconSize} />
      }
    </button>
  );
}
