import { useState } from "react";
import { CodeBlock, CodeBlockContent } from "./code-block";
import { CopyButton } from "./copy-button";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const managers: PackageManager[] = ["npm", "pnpm", "yarn", "bun"];

function buildCommands(packages: string[]): Record<PackageManager, string> {
  const pkgs = packages.join(" ");
  return {
    npm: `npm install ${pkgs}`,
    pnpm: `pnpm add ${pkgs}`,
    yarn: `yarn add ${pkgs}`,
    bun: `bun add ${pkgs}`,
  };
}

interface InstallWidgetProps {
  packages?: string[];
}

export function InstallWidget({ packages = ["temporal-react-datepicker"] }: InstallWidgetProps) {
  const [active, setActive] = useState<PackageManager>("npm");
  const commands = buildCommands(packages);

  return (
    <div className="not-content w-full max-w-xl">
      <CodeBlock>
        {/* Tab bar — package managers only */}
        <div role="tablist" aria-label="Package manager" className="flex border-b border-[#1e1e1e]">
          {managers.map((pm) => (
            <button
              key={pm}
              role="tab"
              aria-selected={active === pm}
              onClick={() => setActive(pm)}
              className={[
                "h-9 flex items-center px-3 text-[0.6875rem] font-mono transition-colors duration-150",
                "border-r border-[#1e1e1e] last:border-r-0 min-w-[44px]",
                active === pm
                  ? "text-[#e4e4e7] bg-[#111111]"
                  : "text-[#a1a1aa] bg-[#0a0a0a] hover:text-[#d4d4d8]",
              ].join(" ")}
            >
              {pm}
            </button>
          ))}
        </div>

        {/* Command + inline copy button */}
        <CodeBlockContent className="flex items-center justify-between gap-3 py-3 px-4">
          <span className="overflow-x-auto whitespace-nowrap">
            <span className="text-[#3f3f46] select-none">$ </span>
            <span className="text-[#e4e4e7]">{commands[active]}</span>
          </span>
          <CopyButton content={commands[active]} className="shrink-0" />
        </CodeBlockContent>
      </CodeBlock>
    </div>
  );
}
