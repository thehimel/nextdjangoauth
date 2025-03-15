import React from "react";
import { Link } from "@heroui/link";
import { useDisclosure } from "@heroui/react";

import DynamicModal from "@/modules/ui/dynamic-modal";
import TermsAndConditions from "@/modules/legal/screens/terms";
import PrivacyPolicy from "@/modules/legal/screens/privacy";

interface TermsAgreementProps {
  className?: string;
}

export function TermsAgreement({ className }: TermsAgreementProps) {
  const { isOpen: isTermsOpen, onOpen: onTermsOpen, onOpenChange: onTermsOpenChange } = useDisclosure();

  const { isOpen: isPrivacyOpen, onOpen: onPrivacyOpen, onOpenChange: onPrivacyOpenChange } = useDisclosure();

  return (
    <>
      <p className={`text-center text-small ${className}`}>
        By logging in, you agree to our&nbsp;
        <Link className="cursor-pointer font-bold text-foreground text-small" onPress={onTermsOpen}>
          Terms
        </Link>
        &nbsp;and&nbsp;
        <Link className="cursor-pointer font-bold text-foreground text-small" onPress={onPrivacyOpen}>
          Privacy Policy
        </Link>
        .
      </p>

      <DynamicModal isOpen={isTermsOpen} onClose={onTermsOpenChange}>
        <TermsAndConditions />
      </DynamicModal>

      <DynamicModal isOpen={isPrivacyOpen} onClose={onPrivacyOpenChange}>
        <PrivacyPolicy />
      </DynamicModal>
    </>
  );
}
