"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiGithub } from "react-icons/si";
import { legalDocuments } from "@/lib/legal-docs";
import { GITHUB_URL } from "@/lib/site-links";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLegalPage = pathname?.startsWith("/legal/");

  if (isLegalPage) {
    return (
      <div className="min-h-dvh bg-paper dark:bg-paper-dark">
        <SiteHeader pathname={pathname} isLegalPage />
        <main className="px-6 py-8 sm:px-12 sm:py-10">{children}</main>
        <SiteFooter pathname={pathname} />
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-paper dark:bg-paper-dark">
      <SiteHeader pathname={pathname} isLegalPage={false} />
      <main className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-5 max-[700px]:py-3 sm:px-12 sm:py-6">
        {children}
      </main>
      <SiteFooter pathname={pathname} />
    </div>
  );
}

function SiteHeader({
  pathname,
  isLegalPage,
}: {
  pathname: string;
  isLegalPage: boolean;
}) {
  return (
    <header className="shrink-0 border-b border-zinc-200/70 bg-paper/80 px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-2.5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-paper-dark/80 max-[700px]:pt-4 max-[700px]:pb-2 sm:px-12 sm:pt-[max(1.75rem,env(safe-area-inset-top))] sm:pb-3">
      <div className="mx-auto flex min-h-10 w-full max-w-3xl items-center justify-between gap-4">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="flex min-w-0 items-center gap-3 text-zinc-700 transition-colors hover:text-accent dark:text-zinc-200 dark:hover:text-accent-dark"
        >
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700 max-[700px]:h-9 max-[700px]:w-9">
            <Image
              src="/logo.png"
              alt="掌上吾理"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </span>
          <span className="truncate text-sm font-medium tracking-wide">
            掌上吾理
          </span>
        </Link>

        {isLegalPage ? (
          <nav className="flex shrink-0 items-center gap-3 text-sm">
            {legalDocuments.map((item) => {
              const href = `/legal/${item.slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={item.slug}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "whitespace-nowrap text-accent dark:text-accent-dark"
                      : "whitespace-nowrap text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        ) : (
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-500 ring-1 ring-zinc-200 transition-colors hover:bg-zinc-50 hover:text-zinc-800 hover:ring-zinc-300 dark:text-zinc-400 dark:ring-zinc-700 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100 dark:hover:ring-zinc-600"
          >
            <SiGithub className="h-5 w-5" aria-hidden />
          </a>
        )}
      </div>
    </header>
  );
}

function SiteFooter({ pathname }: { pathname: string }) {
  return (
    <footer className="shrink-0 border-t border-zinc-200/70 bg-paper/80 px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm dark:border-zinc-800/50 dark:bg-paper-dark/80 max-[700px]:pt-2.5 max-[700px]:pb-2 sm:px-12 sm:pt-5">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] leading-relaxed tracking-wide text-zinc-400 [font-family:var(--font-manrope),ui-sans-serif,system-ui,sans-serif] [font-feature-settings:'liga'_1,'dlig'_1] dark:text-zinc-500 max-[700px]:text-[10px] max-[700px]:leading-5">
          <span className="whitespace-nowrap">(c) 2026 TokenTeam</span>
          <span
            className="mx-2 text-zinc-300 select-none dark:text-zinc-600"
            aria-hidden
          >
            ·
          </span>
          <span>
            This site was built with <span aria-hidden="true">❤</span> by{" "}
            <a
              href="https://owo.cab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 underline-offset-2 transition-colors hover:text-accent hover:underline dark:text-zinc-400 dark:hover:text-accent-dark"
            >
              zhxycn
            </a>
          </span>
          <span
            className="mx-2 text-zinc-300 select-none dark:text-zinc-600 max-[700px]:hidden"
            aria-hidden
          >
            ·
          </span>
          <br className="hidden max-[700px]:block" />
          {legalDocuments.map((item, index) => {
            const href = `/legal/${item.slug}`;
            const isActive = pathname === href;

            return (
              <span key={item.slug}>
                {index > 0 && (
                  <span
                    className="mx-2 text-zinc-300 select-none dark:text-zinc-600"
                    aria-hidden
                  >
                    ·
                  </span>
                )}
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "whitespace-nowrap text-accent underline-offset-2 dark:text-accent-dark"
                      : "whitespace-nowrap text-zinc-500 underline-offset-2 transition-colors hover:text-accent hover:underline dark:text-zinc-400 dark:hover:text-accent-dark"
                  }
                >
                  {item.title}
                </Link>
              </span>
            );
          })}
          <span
            className="mx-2 text-zinc-300 select-none dark:text-zinc-600"
            aria-hidden
          >
            ·
          </span>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-zinc-500 underline-offset-2 transition-colors hover:text-accent hover:underline dark:text-zinc-400 dark:hover:text-accent-dark"
          >
            陕ICP备2025063787号
          </a>
        </p>
      </div>
    </footer>
  );
}
