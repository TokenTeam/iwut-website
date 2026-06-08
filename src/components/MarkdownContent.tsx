import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents: Components = {
  h1({ node: _node, ...props }) {
    return (
      <h1
        className="text-3xl font-light tracking-wide text-accent dark:text-accent-dark sm:text-4xl"
        {...props}
      />
    );
  },
  h2({ node: _node, ...props }) {
    return (
      <h2
        className="mt-10 scroll-m-24 text-xl font-medium text-zinc-800 dark:text-zinc-100"
        {...props}
      />
    );
  },
  h3({ node: _node, ...props }) {
    return (
      <h3
        className="mt-8 scroll-m-24 text-base font-medium text-zinc-800 dark:text-zinc-100"
        {...props}
      />
    );
  },
  p({ node: _node, ...props }) {
    return <p className="text-pretty" {...props} />;
  },
  a({ node: _node, href, ...props }) {
    const isExternal = href?.startsWith("http");

    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="break-all text-accent underline-offset-4 transition-colors hover:underline dark:text-accent-dark"
        {...props}
      />
    );
  },
  strong({ node: _node, ...props }) {
    return (
      <strong
        className="font-medium text-zinc-800 dark:text-zinc-100"
        {...props}
      />
    );
  },
  ol({ node: _node, ...props }) {
    return (
      <ol
        className="list-decimal space-y-2 pl-6 marker:text-zinc-400 dark:marker:text-zinc-500"
        {...props}
      />
    );
  },
  ul({ node: _node, ...props }) {
    return (
      <ul
        className="list-disc space-y-2 pl-6 marker:text-zinc-400 dark:marker:text-zinc-500"
        {...props}
      />
    );
  },
  li({ node: _node, ...props }) {
    return <li className="pl-1" {...props} />;
  },
  table({ node: _node, ...props }) {
    return (
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700/60">
        <table
          className="min-w-full border-collapse text-left text-sm"
          {...props}
        />
      </div>
    );
  },
  thead({ node: _node, ...props }) {
    return (
      <thead
        className="bg-zinc-50 text-zinc-700 dark:bg-white/[0.03] dark:text-zinc-200"
        {...props}
      />
    );
  },
  th({ node: _node, ...props }) {
    return (
      <th
        className="border-b border-zinc-200 px-4 py-3 font-medium whitespace-nowrap dark:border-zinc-700/60"
        {...props}
      />
    );
  },
  tr({ node: _node, ...props }) {
    return (
      <tr
        className="border-t border-zinc-100 dark:border-zinc-800"
        {...props}
      />
    );
  },
  td({ node: _node, ...props }) {
    return <td className="min-w-44 px-4 py-3 align-top" {...props} />;
  },
};

export function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <article className="space-y-5 text-[15px] leading-7 text-zinc-600 dark:text-zinc-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
