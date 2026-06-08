export const legalDocuments = [
  {
    slug: "user-agreement",
    title: "用户协议",
    fileName: "USER_AGREEMENT.zh-CN.md",
    description:
      "掌上吾理用户协议，说明服务内容、账号凭据、使用规则和开源许可等事项。",
  },
  {
    slug: "privacy-policy",
    title: "隐私政策",
    fileName: "PRIVACY_POLICY.zh-CN.md",
    description:
      "掌上吾理隐私政策，说明个人信息收集、使用、存储、共享和权限处理方式。",
  },
] as const;

export type LegalDocument = (typeof legalDocuments)[number];
export type LegalDocumentSlug = LegalDocument["slug"];

const rawBaseUrl =
  "https://raw.githubusercontent.com/TokenTeam/iwut/main/docs/legal";

export function getLegalDocument(slug: string) {
  return legalDocuments.find((document) => document.slug === slug);
}

export function getLegalDocumentRawUrl(document: LegalDocument) {
  return `${rawBaseUrl}/${document.fileName}`;
}
