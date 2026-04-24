import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  a({ href, children, ...rest }) {
    if (href && href.startsWith("/")) {
      return (
        <Link href={href} {...(rest as Record<string, unknown>)}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" {...rest}>
        {children}
      </a>
    );
  },
};

export function EssayBody({
  markdown,
  className,
}: {
  markdown: string;
  className?: string;
}) {
  return (
    <div className={`prose-hawazine mx-auto${className ? ` ${className}` : ""}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
