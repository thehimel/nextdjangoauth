"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Script from "next/script";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export function VantaBackground() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  const initVanta = () => {
    if (!scriptsLoaded || !vantaRef.current || !window.THREE || !window.VANTA) return;

    // Clean up any existing Vanta effect before re-initializing
    if (vantaEffect) {
      vantaEffect.destroy();
      setVantaEffect(null);
    }

    try {
      const effect = window.VANTA.NET({
        THREE: window.THREE,
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
    } catch (error) {
      console.error("Vanta initialization error:", error);
    }
  };

  useEffect(() => {
    initVanta();

    // Cleanup Vanta effect on unmount or before reinitializing
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
        setVantaEffect(null);
      }
    };
  }, [scriptsLoaded, resolvedTheme, pathname]); // Trigger on script load, theme, or pathname change

  useEffect(() => {
    // Check if scripts are already available and set the state
    if (window.THREE && window.VANTA) {
      setScriptsLoaded(true);
    }
  }, []); // Run only on mount

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.THREE) {
            setScriptsLoaded((prev) => (window.VANTA ? true : prev)); // Update state if both scripts are loaded
          }
        }}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.VANTA) {
            setScriptsLoaded((prev) => (window.THREE ? true : prev)); // Update state if both scripts are loaded
          }
        }}
      />
      <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full z-0" />
    </>
  );
}
