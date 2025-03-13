"use client";
import React, { useEffect, useState } from "react";
import { Button, Link, useDisclosure } from "@heroui/react";

import DynamicModal from "@/modules/ui/dynamic-modal";
import CookiePolicy from "@/modules/legal/screens/cookies";

const COOKIE_CONSENT_KEY = "cookie_consent";
const CONSENT_VERSION = "1.0"; // Increment this when cookie policy changes

interface ConsentData {
  consented: boolean;
  timestamp: number;
  version: string;
}

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState<boolean>(false);
  const {
    isOpen: isCookiePolicyOpen,
    onOpen: onCookiePolicyOpen,
    onOpenChange: onCookiePolicyOpenChange,
  } = useDisclosure();

  useEffect(() => {
    // Check consent status on component mount
    const checkConsentStatus = () => {
      try {
        const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);

        if (!storedConsent) {
          setShowConsent(true);

          return;
        }

        const consentData: ConsentData = JSON.parse(storedConsent);

        // Show consent if version is different (policy has been updated)
        if (consentData.version !== CONSENT_VERSION) {
          setShowConsent(true);

          return;
        }

        setShowConsent(false);
      } catch (error) {
        // If there's any error reading from localStorage, show the consent
        console.error("Error reading cookie consent:", error);
        setShowConsent(true);
      }
    };

    // Small delay to prevent hydration issues
    const timeoutId = setTimeout(checkConsentStatus, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleConsent = () => {
    try {
      const consentData: ConsentData = {
        consented: true,
        timestamp: Date.now(),
        version: CONSENT_VERSION,
      };

      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
      setShowConsent(false);
    } catch (error) {
      console.error("Error saving cookie consent:", error);
    }
  };

  if (!showConsent) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="fixed bottom-0 mx-2 my-2">
          <div className="flex w-full items-center justify-between gap-x-4 rounded-large border border-divider bg-background/15 px-6 py-4 shadow-small backdrop-blur">
            <p className="text-small font-normal text-default-700">
              We use cookies to provide the best experience. By continuing to use our site, you agree to our&nbsp;
              <Link className="cursor-pointer font-bold text-foreground text-small" onPress={onCookiePolicyOpen}>
                Cookie Policy
              </Link>
              .
            </p>
            <div className="flex items-center gap-2">
              <Button className="bg-default-foreground text-small font-medium text-background" onPress={handleConsent}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DynamicModal isOpen={isCookiePolicyOpen} onClose={onCookiePolicyOpenChange}>
        <CookiePolicy />
      </DynamicModal>
    </>
  );
}
