import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getLegalMarkdown } from "@/lib/legal-content";
import { getLegalDocument, legalDocuments } from "@/lib/legal-docs";

export const dynamic = "force-static";
export const dynamicParams = false;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return legalDocuments.map((document) => ({ slug: document.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getLegalDocument(slug);

  if (!document) {
    return {};
  }

  return {
    title: document.title,
    description: document.description,
    alternates: {
      canonical: `/legal/${document.slug}`,
    },
    openGraph: {
      title: `${document.title} | 掌上吾理`,
      description: document.description,
      url: `/legal/${document.slug}`,
      type: "article",
    },
  };
}

export default async function LegalDocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const document = getLegalDocument(slug);

  if (!document) {
    notFound();
  }

  const markdown = await getLegalMarkdown(document);

  return (
    <div className="min-h-dvh bg-paper dark:bg-paper-dark">
      <header className="border-b border-zinc-200/70 bg-paper/80 px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-2.5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-paper-dark/80 max-[700px]:pt-4 max-[700px]:pb-2 sm:px-12 sm:pt-[max(1.75rem,env(safe-area-inset-top))] sm:pb-3">
        <div className="mx-auto flex min-h-10 w-full max-w-3xl items-center justify-between gap-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 text-zinc-700 transition-colors hover:text-accent dark:text-zinc-200 dark:hover:text-accent-dark"
          >
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl ring-1 ring-zinc-200 dark:ring-zinc-700 max-[700px]:h-9 max-[700px]:w-9">
              <Image
                src="/logo.png"
                alt="掌上吾理"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </span>
            <span className="truncate text-sm font-medium">掌上吾理</span>
          </Link>
          <nav className="flex shrink-0 items-center gap-3 text-sm">
            {legalDocuments.map((item) => (
              <Link
                key={item.slug}
                href={`/legal/${item.slug}`}
                className={
                  item.slug === document.slug
                    ? "text-accent dark:text-accent-dark"
                    : "text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
                }
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="px-6 py-8 sm:px-12 sm:py-10">
        <div className="mx-auto max-w-3xl">
          <MarkdownContent markdown={markdown} />
        </div>
      </main>
    </div>
  );
}
