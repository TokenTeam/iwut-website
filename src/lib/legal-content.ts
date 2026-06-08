import { readFile } from "node:fs/promises";
import path from "node:path";
import type { LegalDocument } from "@/lib/legal-docs";
import { getLegalDocumentRawUrl } from "@/lib/legal-docs";

async function readLocalFallback(document: LegalDocument) {
  const localPath = path.resolve(
    process.cwd(),
    "../iwut/docs/legal",
    document.fileName,
  );

  return readFile(localPath, "utf8");
}

export async function getLegalMarkdown(document: LegalDocument) {
  const rawUrl = getLegalDocumentRawUrl(document);

  try {
    const response = await fetch(rawUrl, {
      cache: "force-cache",
      next: { revalidate: false },
    });

    if (!response.ok) {
      throw new Error(`GitHub raw responded with ${response.status}`);
    }

    return response.text();
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    return readLocalFallback(document);
  }
}
