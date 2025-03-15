"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";

export default function FadedHome() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine gradient based on theme
  const getGradient = () => {
    if (!mounted) return "linear-gradient(91deg, #000 32.88%, rgba(0, 0, 0, 0.40) 99.12%)"; // Default fallback

    return theme === "light"
      ? "linear-gradient(91deg, #000 32.88%, rgba(0, 0, 0, 0.40) 99.12%)" // Dark text for light mode
      : "linear-gradient(91deg, #FFF 32.88%, rgba(255, 255, 255, 0.40) 99.12%)"; // Light text for dark mode
  };

  return (
    <div className="relative flex flex-col overflow-hidden">
      {/* Main content section */}
      <section className="relative min-h-[calc(100vh-140px)] flex flex-col items-center justify-center">
        <div className="z-20 flex flex-col items-center justify-center gap-[18px] sm:gap-6">
          <Button
            className="h-9 overflow-hidden border-1 border-default-100 bg-default-50 px-[18px] py-2 text-small font-normal leading-5 text-default-500"
            endContent={
              <Icon className="flex-none outline-none [&>path]:stroke-[2]" icon="solar:arrow-right-linear" width={20} />
            }
            radius="full"
            variant="bordered"
          >
            Quick Start Guide
          </Button>
          <div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
            {/* Theme-aware gradient text */}
            <div
              style={{
                backgroundImage: getGradient(),
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Seamless authentication, <br /> pre-configured.
            </div>
          </div>
          <p className="text-center font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]">
            Focus on building features – email and Google sign-in are already integrated for you with Next.js & Django.
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button
              className="h-10 w-[163px] bg-default-foreground px-[16px] py-[10px] text-small font-medium leading-5 text-background"
              radius="full"
            >
              Get Started
            </Button>
            <Button
              className="h-10 w-[163px] border-1 border-default-100 px-[16px] py-[10px] text-small font-medium leading-5"
              endContent={
                <span className="pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full bg-default-100">
                  <Icon className="text-default-500 [&>path]:stroke-[1.5]" icon="solar:arrow-right-linear" width={16} />
                </span>
              }
              radius="full"
              variant="bordered"
            >
              Explore
            </Button>
          </div>
        </div>

        {/* Background gradient */}
      </section>
    </div>
  );
}
