"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function ShareContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const iwutDeeplink = searchParams.get("iwut");

  useEffect(() => {
    if (iwutDeeplink) {
      window.location.href = `iwut://${iwutDeeplink}`;
    } else {
      router.push("/");
    }
  }, [iwutDeeplink, router]);

  return (
    <div className="max-w-md w-full flex flex-col items-center text-center">
      <div className="relative h-18 w-18 mb-10 overflow-hidden rounded-2xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/15 dark:shadow-md max-[700px]:h-16 max-[700px]:w-16 sm:h-20 sm:w-20 sm:rounded-3xl">
        <Image
          src="/logo.png"
          alt="掌上吾理"
          fill
          className="object-contain"
          priority
          unoptimized
        />
      </div>

      <div className="mt-7 text-xs font-light leading-relaxed text-zinc-500 dark:text-zinc-400 max-[700px]:mt-4 max-[700px]:text-sm sm:mt-8 sm:text-base">
        <p>
          正在拉起掌上吾理 App，
          <a
            href={`iwut://${iwutDeeplink}`}
            className="text-accent dark:text-accent-dark"
          >
            点击重试
          </a>
        </p>
        <p>
          还没有安装？
          <a href="/" className="text-accent dark:text-accent-dark">
            点击下载
          </a>
        </p>
      </div>
    </div>
  );
}

export default function Share() {
  return (
    <Suspense fallback={null}>
      <ShareContent />
    </Suspense>
  );
}
