import React from "react";
import { Link } from "@heroui/link";
import { useDisclosure } from "@heroui/react";
import { useTranslations } from "next-intl";

import DynamicModal from "@/modules/ui/components/dynamic-modal";
import TermsAndConditions from "@/modules/legal/screens/terms";
import PrivacyPolicy from "@/modules/legal/screens/privacy";

interface TermsAgreementProps {
  className?: string;
}

export function TermsAgreement({ className }: TermsAgreementProps) {
  const t = useTranslations("authMessages.termsAgreement");
  const { isOpen: isTermsOpen, onOpen: onTermsOpen, onOpenChange: onTermsOpenChange } = useDisclosure();
  const { isOpen: isPrivacyOpen, onOpen: onPrivacyOpen, onOpenChange: onPrivacyOpenChange } = useDisclosure();

  return (
    <>
      <p className={`text-center text-small ${className}`}>
        {t.rich("text", {
          terms: (chunks) => (
            <Link className="cursor-pointer font-bold text-foreground text-small" onPress={onTermsOpen}>
              {chunks}
            </Link>
          ),
          privacy: (chunks) => (
            <Link className="cursor-pointer font-bold text-foreground text-small" onPress={onPrivacyOpen}>
              {chunks}
            </Link>
          ),
        })}
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
