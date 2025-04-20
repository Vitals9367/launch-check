import type { JSX } from "react";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { codeToHast } from "shiki";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

export async function CodeBlock({
  code,
  language,
  className = "",
}: CodeBlockProps) {
  const out = await codeToHast(code, {
    lang: language,
    theme: "github-dark",
  });

  return toJsxRuntime(out as any, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: (props) => <pre {...props} className="p-2" />,
    },
  }) as JSX.Element;
}
