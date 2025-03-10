"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UsePreviousUrlReturn {
  previousUrl: string;
  goBack: () => void;
  navigateAndStore: (destination: string) => void;
}

export const usePreviousUrl = (defaultUrl: string = "/"): UsePreviousUrlReturn => {
  const [previousUrl, setPreviousUrl] = useState<string>(defaultUrl);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPreviousUrl = sessionStorage.getItem("previousUrl");
      const referrer = document.referrer;

      let prevUrl = defaultUrl;

      if (storedPreviousUrl) {
        prevUrl = storedPreviousUrl;
      } else if (referrer && new URL(referrer).origin === window.location.origin) {
        prevUrl = new URL(referrer).pathname;
      }

      setPreviousUrl(prevUrl);
    }
  }, [defaultUrl]);

  const goBack = (): void => {
    router.push(previousUrl);
  };

  const navigateAndStore = (destination: string): void => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("previousUrl", window.location.pathname);
      router.push(destination);
    }
  };

  return {
    previousUrl,
    goBack,
    navigateAndStore,
  };
};
