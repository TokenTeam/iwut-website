import type { Metadata } from "next";
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
    <div className="mx-auto max-w-3xl">
      <MarkdownContent markdown={markdown} />
    </div>
  );
}
