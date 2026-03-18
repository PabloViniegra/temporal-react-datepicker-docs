"use client";

import { useState, useEffect } from "react";
import { getHighlighter, THEME } from "@/utils/shiki";

interface CodeblockShikiProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeblockShiki({ code, language = "bash", className }: CodeblockShikiProps) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    getHighlighter().then((highlighter) => {
      if (!cancelled) {
        const result = highlighter.codeToHtml(code, {
          lang: language,
          theme: THEME,
        });
        setHtml(result);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  if (!html) {
    return (
      <span className={`font-mono text-sm text-[#a1a1aa] ${className ?? ""}`}>
        {code}
      </span>
    );
  }

  return (
    <span
      className={`
        [&_pre]:bg-transparent [&_pre]:p-0 [&_pre]:m-0
        [&_code]:bg-transparent [&_code]:font-mono [&_code]:text-sm
        ${className ?? ""}
      `}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
