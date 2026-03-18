"use client";

import { CodeBlock, CodeBlockContent } from "./code-block";
import { CopyButton } from "./copy-button";
import { CodeblockShiki } from "./shiki-code";
import { cn } from "@/utils/cn";

interface InlineCodeProps {
  code: string;
  language?: string;
  className?: string;
}

export function InlineCode({ code, language = "bash", className }: InlineCodeProps) {
  return (
    <CodeBlock className={cn("max-w-full", className)}>
      <CodeBlockContent className="flex items-center justify-between gap-2 py-2.5 px-4">
        <CodeblockShiki language={language} code={code} />
        <CopyButton content={code} className="shrink-0" />
      </CodeBlockContent>
    </CodeBlock>
  );
}

export default InlineCode;
