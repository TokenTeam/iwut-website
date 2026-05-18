"use client";

import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { HiArrowDownTray, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { SiAndroid, SiApple, SiGithub, SiQq } from "react-icons/si";
import type { DeviceType } from "@/utils/detectDevice";
import { getDeviceType } from "@/utils/detectDevice";

const IOS_URL =
  "https://apps.apple.com/cn/app/%E6%8E%8C%E4%B8%8A%E5%90%BE%E7%90%86/id1494650352";
const ANDROID_URL = "https://download.tokenteam.dev/iwut/latest/production.apk";
const GITHUB_URL = "https://github.com/TokenTeam/iwut";
const QQ_GROUP_URL = "https://qm.qq.com/q/4uQT2NduJG";
const TESTFLIGHT_URL = "https://testflight.apple.com/join/7jtPqWDT";

function trackDownload() {
  axios
    .get("https://count.api.tokenteam.dev/?project=iwut-download")
    .catch((error) => console.error(error));
}

export default function Home() {
  const [device, setDevice] = useState<DeviceType | null>(null);

  const detectDevice = useCallback(() => {
    setDevice(getDeviceType());
  }, []);

  useEffect(() => {
    detectDevice();
    window.addEventListener("resize", detectDevice);
    return () => window.removeEventListener("resize", detectDevice);
  }, [detectDevice]);

  if (!device) return null;

  const isIOS = device === "iOS";

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b border-zinc-200/70 bg-paper/80 px-6 pt-[max(1.25rem,env(safe-area-inset-top))] pb-3 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-paper-dark/80 sm:px-12 sm:pb-4 sm:pt-[max(1.5rem,env(safe-area-inset-top))]">
        <div className="mx-auto flex w-full max-w-md items-center justify-between sm:max-w-lg">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700">
              <Image
                src="/logo.png"
                alt="掌上吾理"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <p className="truncate text-sm font-medium tracking-wide text-zinc-800 dark:text-zinc-200">
              掌上吾理
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-500 ring-1 ring-zinc-200 transition-colors hover:bg-zinc-50 hover:text-zinc-800 hover:ring-zinc-300 dark:text-zinc-400 dark:ring-zinc-700 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100 dark:hover:ring-zinc-600"
            >
              <SiGithub className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12">
        <div className="max-w-md w-full flex flex-col items-center text-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/15 dark:shadow-md">
            <Image
              src="/logo.png"
              alt="掌上吾理"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>

          <h1 className="mt-10 sm:mt-14 text-3xl sm:text-4xl font-light tracking-wide text-accent dark:text-accent-dark">
            掌上吾理
          </h1>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
            一键开启愉快的武汉理工大学校园生活
          </p>

          <div className="mt-12 sm:mt-20 w-8 h-px bg-zinc-300 dark:bg-zinc-600" />

          <div className="mt-12 sm:mt-20 w-full space-y-3.5">
            <div className="w-full overflow-hidden rounded-2xl border border-accent/30 bg-accent/[0.05] transition-colors hover:border-accent/50 dark:border-accent-dark/15 dark:bg-accent-dark/[0.04] dark:hover:border-accent-dark/25">
              <a
                href={isIOS ? IOS_URL : ANDROID_URL}
                target={isIOS ? "_blank" : undefined}
                rel={isIOS ? "noopener noreferrer" : undefined}
                onClick={trackDownload}
                className="group block px-5 py-5 sm:px-8 sm:py-7 text-left transition-colors hover:bg-accent/[0.05] dark:hover:bg-accent-dark/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent dark:bg-accent-dark/8 dark:text-accent-dark sm:h-11 sm:w-11">
                      {isIOS ? (
                        <SiApple
                          className="h-5 w-5 sm:h-[18px] sm:w-[18px]"
                          aria-hidden
                        />
                      ) : (
                        <SiAndroid
                          className="h-5 w-5 sm:h-[18px] sm:w-[18px]"
                          aria-hidden
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-[15px] sm:text-sm font-medium text-zinc-800 dark:text-zinc-100">
                          {isIOS ? "iOS" : "Android"}
                        </h3>
                        <span className="text-[10px] tracking-wider uppercase text-accent dark:text-accent-dark font-semibold">
                          推荐
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        {isIOS ? "前往 App Store" : "直接下载安装包"}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-white transition-transform group-hover:scale-105 dark:bg-accent-dark dark:text-zinc-900">
                    {isIOS ? (
                      <HiArrowTopRightOnSquare
                        className="h-4 w-4"
                        aria-hidden
                      />
                    ) : (
                      <HiArrowDownTray className="h-4 w-4" aria-hidden />
                    )}
                  </div>
                </div>
              </a>
              {isIOS && (
                <a
                  href={TESTFLIGHT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-1.5 border-t border-accent/15 px-4 py-2.5 text-[11px] text-zinc-500 transition-colors hover:bg-accent/[0.04] hover:text-accent dark:border-accent-dark/10 dark:text-zinc-400 dark:hover:bg-accent-dark/[0.05] dark:hover:text-accent-dark sm:text-xs"
                >
                  <span className="opacity-80 group-hover:opacity-100">
                    想尝鲜？加入 TestFlight 内测
                  </span>
                  <HiArrowTopRightOnSquare
                    className="h-3 w-3 opacity-60 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </a>
              )}
            </div>

            <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-transparent transition-colors hover:border-zinc-300 dark:border-zinc-700/40 dark:bg-white/[0.02] dark:hover:border-zinc-600/50">
              <a
                href={isIOS ? ANDROID_URL : IOS_URL}
                target={isIOS ? undefined : "_blank"}
                rel={isIOS ? undefined : "noopener noreferrer"}
                onClick={trackDownload}
                className="group block px-5 py-4.5 sm:px-8 sm:py-6 text-left transition-colors hover:bg-zinc-50/50 dark:hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100/70 text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400 sm:h-10 sm:w-10">
                      {isIOS ? (
                        <SiAndroid
                          className="h-5 w-5 sm:h-[18px] sm:w-[18px]"
                          aria-hidden
                        />
                      ) : (
                        <SiApple
                          className="h-5 w-5 sm:h-[18px] sm:w-[18px]"
                          aria-hidden
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-[15px] sm:text-sm text-zinc-600 dark:text-zinc-300">
                        {isIOS ? "Android" : "iOS"}
                      </h3>
                      <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                        {isIOS ? "直接下载安装包" : "前往 App Store"}
                      </p>
                    </div>
                  </div>
                  <div className="text-zinc-300 transition-colors group-hover:text-zinc-500 dark:text-zinc-600 dark:group-hover:text-zinc-400">
                    {isIOS ? (
                      <HiArrowDownTray className="h-4 w-4" aria-hidden />
                    ) : (
                      <HiArrowTopRightOnSquare
                        className="h-4 w-4"
                        aria-hidden
                      />
                    )}
                  </div>
                </div>
              </a>
              {!isIOS && (
                <a
                  href={TESTFLIGHT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-1.5 border-t border-zinc-200 px-4 py-2.5 text-[11px] text-zinc-400 transition-colors hover:bg-zinc-50/60 hover:text-accent dark:border-zinc-700/40 dark:text-zinc-500 dark:hover:bg-white/[0.03] dark:hover:text-accent-dark sm:text-xs"
                >
                  <span className="opacity-80 group-hover:opacity-100">
                    想尝鲜？加入 TestFlight 内测
                  </span>
                  <HiArrowTopRightOnSquare
                    className="h-3 w-3 opacity-60 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </a>
              )}
            </div>
          </div>

          <a
            href={QQ_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex max-w-full items-center gap-2.5 rounded-full border border-zinc-200/80 bg-white/40 px-3.5 py-2 text-left text-zinc-500 shadow-sm shadow-zinc-900/[0.02] transition-all hover:border-[#12b7f5]/35 hover:bg-[#12b7f5]/[0.04] hover:text-zinc-700 dark:border-zinc-700/50 dark:bg-white/[0.03] dark:text-zinc-400 dark:shadow-none dark:hover:border-[#12b7f5]/35 dark:hover:bg-[#12b7f5]/[0.06] dark:hover:text-zinc-200 sm:mt-6"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#12b7f5]/10 text-[#12b7f5] transition-colors group-hover:bg-[#12b7f5]/15 dark:bg-[#12b7f5]/15 dark:text-[#6ed4ff]">
              <SiQq className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="truncate text-xs sm:text-[13px]">
              加入 QQ 群，反馈问题
            </span>
            <span className="shrink-0 text-zinc-300 transition-all group-hover:translate-x-0.5 group-hover:text-[#12b7f5] dark:text-zinc-600 dark:group-hover:text-[#6ed4ff]">
              <HiArrowTopRightOnSquare className="h-3.5 w-3.5" aria-hidden />
            </span>
          </a>
        </div>
      </main>

      <footer className="px-6 sm:px-12 pt-16 sm:pt-24 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto max-w-2xl border-t border-zinc-200/80 pt-8 text-center dark:border-zinc-700/40">
          <p className="text-[11px] leading-relaxed tracking-wide text-zinc-400 [font-family:var(--font-manrope),ui-sans-serif,system-ui,sans-serif] [font-feature-settings:'liga'_1,'dlig'_1] dark:text-zinc-500">
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
    </div>
  );
}
