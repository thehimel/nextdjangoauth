"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import Script from "next/script";

import { siteConfig } from "@/modules/global/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/modules/global/components/icons";

// Declare VANTA in the global window object
declare global {
  interface Window {
    VANTA: any;
  }
}

export default function Home() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);
  const { resolvedTheme } = useTheme(); // `resolvedTheme` ensures correct theme

  useEffect(() => {
    if (vantaEffect) {
      vantaEffect.destroy(); // Destroy previous effect before applying new one
    }

    if (typeof window !== "undefined" && window?.VANTA) {
      const effect = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x8a2be2,
        backgroundColor: resolvedTheme === "light" ? 0xffffff : 0x000000,
        points: 12.0,
        maxDistance: 16.0,
        spacing: 17.0,
      });

      setVantaEffect(effect);
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [resolvedTheme]); // Re-run when theme changes

  return (
    <>
      {/* Load required THREE.js and Vanta.js scripts */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js" strategy="beforeInteractive" />

      {/* Use a wrapper div for the vanta effect that covers the entire page */}
      <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full z-0" />

      {/* Main content positioned above the background */}
      <section className="relative z-10 flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Integrate&nbsp;</span>
          <span className={title({ color: "violet" })}>authentication&nbsp;</span>
          <br />
          <span className={title()}>effortlessly, regardless of your experience.</span>
          <div className={subtitle({ class: "mt-4" })}>
            Authentication simplified with <span className="text-blue-500">Next.js</span> and{" "}
            <span className="text-green-500">Django</span>.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing <Code color="primary">app/page.tsx</Code>
            </span>
          </Snippet>
        </div>
      </section>
    </>
  );
}
