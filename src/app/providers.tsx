"use client";

import Script from "next/script";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script src="/lasy-bridge.js" strategy="beforeInteractive" />
      {children}
    </>
  );
}
