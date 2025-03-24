"use client";

import React from "react";
import { Divider } from "@heroui/divider";
import { ResizablePanel } from "@heroui/framer-utils";
import { Button } from "@heroui/button";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { Icon } from "@iconify/react";

import { Logo } from "@/modules/global/components/icons";
import GoogleAuth from "@/modules/auth/screens/google-auth";
import MagicLinkAuth from "@/modules/auth/screens/magic-link-auth";
import { TermsAgreement } from "@/modules/auth/components/terms-agreement";
import { useAuthMessages } from "@/modules/auth/hooks/useAuthMessages";
import { useSignInErrorMessage } from "@/modules/auth/hooks/useSignInErrorMessage";
import { appConfig } from "@/modules/global/config/site";
import LoadingScreen from "@/modules/auth/components/loading-screen";

// Authentication provider IDs
export const AuthProviders = {
  Google: "google",
  MagicLink: "magic-link",
};

const AuthContainer = ({
  authOptions = {
    google: true,
    magicLink: true,
  },
  providerId = {
    google: "google",
    magicLink: "magic-link",
  },
}) => {
  const authMessages = useAuthMessages();
  const getSignInErrorMessage = useSignInErrorMessage();
  const searchParams = useSearchParams();

  // State for UI control
  const [activeView, setActiveView] = React.useState("options"); // options | email | loading
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [verifyingToken, setVerifyingToken] = React.useState(false);

  // URL params
  const urlParams = React.useMemo(
    () => ({
      errorType: searchParams.get("error"),
      token: searchParams.get("token"),
      callbackUrl: searchParams.get("callbackUrl") || "/",
      email: searchParams.get("email") || "",
    }),
    [searchParams],
  );

  // Animation variants
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 10 },
  };

  // Error handling from URL params
  React.useEffect(() => {
    if (urlParams.errorType) {
      const emailText = urlParams.email ? `${urlParams.email} ` : "";
      const errorMessage =
        urlParams.errorType === "email_registered_with_email_login"
          ? authMessages.authentication.emailRegisteredWithEmailLogin(emailText)
          : getSignInErrorMessage(urlParams.errorType);

      setError(errorMessage);
    }
  }, [urlParams.errorType, urlParams.email, getSignInErrorMessage, authMessages]);

  // Magic link token verification from URL
  React.useEffect(() => {
    if (urlParams.token) {
      setVerifyingToken(true);
    }
  }, [urlParams.token]);

  const handleAuthAttempt = () => {
    setIsSubmitting(true);
  };

  const handleBackToOptions = () => {
    setActiveView("options");
    setError("");
  };

  if (verifyingToken) {
    return <LoadingScreen message={authMessages.magicLink.linkVerificationInProgress} />;
  }

  // Both auth options are disabled
  if (!authOptions.google && !authOptions.magicLink) {
    return (
      <div className="p-4 text-center">
        <p>No authentication methods are enabled. Please configure at least one authentication method.</p>
      </div>
    );
  }

  // Only one option is enabled - show it directly
  if (authOptions.google && !authOptions.magicLink) {
    return (
      <ResizablePanel>
        <div className="flex flex-col items-center">
          <Logo size={60} />
          <h1 className="text-xl font-medium mt-2 mb-4">{appConfig.name}</h1>
          {error && renderErrorMessage(error)}
          <GoogleAuth
            buttonText={authMessages.authentication.continueWithGoogle}
            callbackUrl={urlParams.callbackUrl}
            isLoading={isSubmitting}
            onAuthAttempt={handleAuthAttempt}
          />
          <TermsAgreement className="mt-4" />
        </div>
      </ResizablePanel>
    );
  }

  if (!authOptions.google && authOptions.magicLink) {
    return (
      <ResizablePanel>
        <div className="flex flex-col items-center">
          <Logo size={60} />
          <h1 className="text-xl font-medium mt-2 mb-4">{appConfig.name}</h1>
          {error && renderErrorMessage(error)}
          <MagicLinkAuth
            authMessages={authMessages}
            buttonText={authMessages.authentication.continueWithEmail}
            callbackUrl={urlParams.callbackUrl}
            isLoading={isSubmitting}
            providerId={providerId.magicLink}
            onAuthAttempt={handleAuthAttempt}
          />
          <TermsAgreement className="mt-4" />
        </div>
      </ResizablePanel>
    );
  }

  // Show both options
  return (
    <ResizablePanel>
      <div className="flex flex-col items-center">
        <Logo size={60} />
        <h1 className="text-xl font-medium mt-2 mb-4">{appConfig.name}</h1>
      </div>

      {error && renderErrorMessage(error)}

      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false} mode="popLayout">
          {activeView === "options" ? (
            <m.div
              animate="visible"
              className="flex flex-col gap-y-3"
              exit="hidden"
              initial="hidden"
              variants={variants}
            >
              <GoogleAuth
                buttonText={authMessages.authentication.continueWithGoogle}
                callbackUrl={urlParams.callbackUrl}
                isEnabled={authOptions.google}
                isLoading={isSubmitting}
                onAuthAttempt={handleAuthAttempt}
              />

              {authOptions.google && authOptions.magicLink && renderDivider()}

              {authOptions.magicLink && (
                <Button
                  fullWidth
                  className="border-1 text-small font-medium"
                  startContent={<Icon className="pointer-events-none text-2xl" icon="solar:letter-bold" />}
                  type="button"
                  variant="bordered"
                  onPress={() => setActiveView("email")}
                >
                  {authMessages.authentication.continueWithEmail}
                </Button>
              )}

              <TermsAgreement className="mt-3" />
            </m.div>
          ) : activeView === "email" ? (
            <MagicLinkAuth
              authMessages={authMessages}
              buttonText={authMessages.authentication.continueWithEmail}
              callbackUrl={urlParams.callbackUrl}
              isLoading={isSubmitting}
              providerId={providerId.magicLink}
              onAuthAttempt={handleAuthAttempt}
              onBackPress={handleBackToOptions}
            />
          ) : null}
        </AnimatePresence>
      </LazyMotion>
    </ResizablePanel>
  );

  function renderDivider() {
    return (
      <div className="flex items-center gap-4 py-2">
        <Divider className="flex-1" />
        <p className="shrink-0 text-tiny text-default-500">OR</p>
        <Divider className="flex-1" />
      </div>
    );
  }

  function renderErrorMessage(message: string) {
    return (
      <div className="p-4 mb-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 w-full">
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0">
            <Icon
              aria-hidden="true"
              className="h-5 w-5 text-zinc-600 dark:text-zinc-400"
              icon="heroicons:exclamation-circle"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{message}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default AuthContainer;
