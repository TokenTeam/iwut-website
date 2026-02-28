"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getDeviceType } from "@/utils/detectDevice";
import axios from "axios";

export default function Home() {
  const [device, setDevice] = useState<null | string>(null);
  const [downloadUrl, setDownloadUrl] = useState("");

  const detectDevice = useCallback(() => {
    const detectedDevice = getDeviceType();
    setDevice(detectedDevice);

    if (detectedDevice === "iOS") {
      setDownloadUrl(
        "https://apps.apple.com/cn/app/%E6%8E%8C%E4%B8%8A%E5%90%BE%E7%90%86/id1494650352"
      );
    } else {
      setDownloadUrl("https://download.tokenteam.dev/latest.apk");
    }
  }, []);

  const handleDownloadClick = () => {
    axios.get("https://count.api.tokenteam.dev/?project=iwut-download")
      .catch(error => console.error(error));
    
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    }
  };

  useEffect(() => {
    detectDevice();
    window.addEventListener("resize", detectDevice);
    return () => {
      window.removeEventListener("resize", detectDevice);
    };
  }, [detectDevice]);

  if (!device) return null;

  return (
    <div className="font-sans min-h-[100dvh] relative overflow-hidden">
      <div className="fixed inset-0 animate-gradient">
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
        <div className="bubble left-[10%] top-[20%]"></div>
        <div className="bubble left-[60%] top-[40%]"></div>
        <div className="bubble left-[30%] top-[60%]"></div>
        <div className="bubble left-[80%] top-[25%]"></div>
        <div className="bubble left-[45%] top-[75%]"></div>
      </div>
      <main className="flex flex-col min-h-[100dvh] relative z-10 px-6 sm:px-16 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto gap-12">
          <h1 className="text-4xl font-bold tracking-wider text-white">
            吾理经纬
          </h1>
          <div className="w-full max-w-[128px] sm:max-w-[240px] aspect-square relative">
            <Image
              src="/logo.png"
              alt="吾理经纬"
              fill
              className="rounded-3xl shadow-lg"
              style={{
                objectFit: "contain",
                
              }}
              priority
              unoptimized
            />
          </div>
          <div className="flex justify-center w-full mt-8">
          <button
            onClick={() => {
              const btn = document.querySelector(
                ".download-button"
              ) as HTMLButtonElement;
              if (btn) {
                btn.classList.remove("shine");
                void btn.offsetWidth;
                btn.classList.add("shine");
              }
              handleDownloadClick();
            }}
            className="download-button shine rounded-lg border border-solid border-white/20 flex items-center justify-center text-white gap-2 hover:bg-white/20 font-medium text-sm sm:text-base h-12 px-6 sm:px-10 w-72"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>下载 {device === "iOS" ? "iOS" : "Android"} 版</span>
          </button>
          </div>
        </div>
      </main>
    </div>
  );
}