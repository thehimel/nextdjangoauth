"use client";

import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Icon } from "@iconify/react";
import { ResizablePanel } from "@heroui/framer-utils";
import { AnimatePresence, m, domAnimation, LazyMotion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { Logo } from "@/modules/global/components/icons";
import LoadingScreen from "@/modules/auth/components/loading-screen";
import { handleEmailBlur } from "@/modules/auth/validators/emailValidator";
import { requestMagicLink } from "@/modules/auth/services/requestMagicLink";
import { ProviderId } from "@/modules/auth/constants";
import { useAuthMessages } from "@/modules/auth/hooks/useAuthMessages";
import { useSignInErrorMessage } from "@/modules/auth/hooks/useSignInErrorMessage";
import { appConfig } from "@/modules/global/config/site";
import { TermsAgreement } from "@/modules/auth/components/terms-agreement";

export default function LogInScreen() {
  const authMessages = useAuthMessages();
  const getSignInErrorMessage = useSignInErrorMessage();
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for UI control
  const [isFormVisible, setIsFormVisible] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState<"email" | "verification">("email");

  // Form state
  const [email, setEmail] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [verificationCodeError, setVerificationCodeError] = React.useState("");

  // Status state
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [error, setError] = React.useState("");
  const [verifyingToken, setVerifyingToken] = React.useState(false);

  // Countdown state
  const [canTryAgain, setCanTryAgain] = React.useState(false);
  const [countdown, setCountdown] = React.useState(120); // 120 seconds = 2 minutes

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
  }, [urlParams.errorType, urlParams.email]);

  // Countdown timer effect
  React.useEffect(() => {
    if (currentStep === "verification" && !canTryAgain) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanTryAgain(true);

            return 0;
          }

          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentStep, canTryAgain]);

  // Magic link token verification from URL
  React.useEffect(() => {
    if (urlParams.token) {
      setVerifyingToken(true);
      signIn(ProviderId.MagicLink, {
        token: urlParams.token,
        redirect: false,
        callbackUrl: urlParams.callbackUrl,
      })
        .then((response) => {
          if (response?.error) {
            setError(authMessages.magicLink.verifyMagicLinkError);
            setVerifyingToken(false);
          } else {
            router.push(urlParams.callbackUrl);
          }
        })
        .catch((error) => {
          console.error("Error verifying magic link token:", error);
          setError(authMessages.magicLink.verifyMagicLinkError);
          setVerifyingToken(false);
        });
    }
  }, [urlParams.token, urlParams.callbackUrl, router]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setEmailError("");
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setEmailError(authMessages.validationErrors.emailValidationError);

      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await requestMagicLink(email, authMessages);

      if (response.success) {
        setEmailSent(true);
        setCurrentStep("verification");
        setCanTryAgain(false);
        setCountdown(120);
      } else {
        setError(response.error?.email || response.error?.message || response.message);
        if (response.error?.code === "email_registered_with_social_login" && isFormVisible) {
          setError(authMessages.authentication.emailRegisteredWithSocialLogin(response.error.provider || "social"));
          setIsFormVisible(false);
        }
      }
    } catch (error) {
      console.error("Error sending magic link:", error);
      setError(authMessages.magicLink.failedToSendMagicLinkError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!verificationCode) {
      setVerificationCodeError(authMessages.validationErrors.verificationCodeEmptyError);

      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Use the same signIn method as the magic link, but with the verification code as token
      const result = await signIn(ProviderId.MagicLink, {
        token: verificationCode, // Use the verification code as the token
        redirect: false,
        callbackUrl: urlParams.callbackUrl,
      });

      if (result?.error) {
        setVerificationCodeError(authMessages.validationErrors.verificationCodeValidationError);
        setEmailSent(false);
      } else {
        router.push(urlParams.callbackUrl);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setError(authMessages.magicLink.failedToVerifyCodeError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    void signIn(ProviderId.Google, { callbackUrl: urlParams.callbackUrl });
  };

  const handleBackToEmail = () => {
    setCurrentStep("email");
    setVerificationCode("");
    setError("");
    setCanTryAgain(false);
    setCountdown(120); // Reset countdown
  };

  // UI elements
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 10 },
  };

  const orDivider = (
    <div className="flex items-center gap-4 py-2">
      <Divider className="flex-1" />
      <p className="shrink-0 text-tiny text-default-500">OR</p>
      <Divider className="flex-1" />
    </div>
  );

  if (verifyingToken) {
    return <LoadingScreen message={authMessages.magicLink.linkVerificationInProgress} />;
  }

  return (
    <ResizablePanel>
      <div className="flex flex-col items-center">
        <Logo size={60} />
        <h1 className="text-xl font-medium mt-2 mb-4">{appConfig.name}</h1>
      </div>

      {error && (
        <div className="p-4 mb-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-center">
            <div className="flex-shrink-0">
              <Icon
                aria-hidden="true"
                className="h-5 w-5 text-zinc-600 dark:text-zinc-400"
                icon="heroicons:exclamation-circle"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence initial={false} mode="popLayout">
        <LazyMotion features={domAnimation}>
          {isFormVisible ? (
            <m.div
              animate="visible"
              className="flex flex-col gap-y-3"
              exit="hidden"
              initial="hidden"
              variants={variants}
            >
              {currentStep === "email" ? (
                <Form validationBehavior="native" onSubmit={handleEmailSubmit}>
                  <Input
                    errorMessage={emailError}
                    isInvalid={!!emailError}
                    label={authMessages.loginForm.emailLabel}
                    name="email"
                    placeholder={authMessages.loginForm.emailPlaceholder}
                    startContent={<Icon className="text-gray-400" icon="mdi:email-outline" />}
                    type="email"
                    value={email}
                    variant="bordered"
                    onBlur={() =>
                      handleEmailBlur(email, setEmailError, authMessages.validationErrors.emailValidationError)
                    }
                    onChange={handleEmailChange}
                  />
                  <Button
                    fullWidth
                    className="bg-default-foreground text-small font-medium text-background"
                    isDisabled={!email || !!emailError}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    {authMessages.authentication.continueWithEmail}
                  </Button>
                </Form>
              ) : (
                <>
                  {emailSent && (
                    <div className="p-4 mb-1 rounded-lg bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800">
                      <div className="flex items-center justify-center">
                        <div className="flex-shrink-0">
                          <Icon
                            aria-hidden="true"
                            className="h-5 w-5 text-zinc-600 dark:text-zinc-400"
                            icon="heroicons:check-circle"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            {authMessages.magicLink.verificationCodeSent}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form validationBehavior="native" onSubmit={handleVerificationSubmit}>
                    <Input
                      errorMessage={verificationCodeError}
                      isInvalid={!!verificationCodeError}
                      label={authMessages.loginForm.verificationCodeLabel}
                      name="verificationCode"
                      placeholder={authMessages.loginForm.verificationCodePlaceholder}
                      startContent={
                        <Icon
                          aria-hidden="true"
                          className="h-4 w-4 text-gray-400 dark:text-gray-500 pointer-events-none flex-shrink-0"
                          icon="heroicons:key"
                        />
                      }
                      type="text"
                      value={verificationCode}
                      variant="bordered"
                      onValueChange={(value) => {
                        setError("");
                        setVerificationCodeError("");
                        setVerificationCode(value);
                      }}
                    />
                    <Button
                      fullWidth
                      className="bg-default-foreground text-small font-medium text-background"
                      isDisabled={!verificationCode || !!verificationCodeError}
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      {authMessages.magicLink.continue}
                    </Button>
                    <Button
                      fullWidth
                      className="border-1 text-small font-medium"
                      isDisabled={!canTryAgain}
                      variant="bordered"
                      onPress={handleBackToEmail}
                    >
                      {canTryAgain
                        ? "Try Again"
                        : `Try Again (${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')})`
                      }
                    </Button>
                  </Form>
                </>
              )}

              {currentStep === "email" && (
                <>
                  {orDivider}
                  <Button
                    fullWidth
                    className="border-1 text-small font-medium"
                    startContent={<Icon className="text-default-500" icon="solar:arrow-left-linear" width={18} />}
                    variant="bordered"
                    onPress={() => {
                      setIsFormVisible(false);
                      setCurrentStep("email");
                      setError("");
                    }}
                  >
                    {authMessages.authentication.otherLoginOptions}
                  </Button>
                </>
              )}
            </m.div>
          ) : (
            <>
              <Button
                fullWidth
                className="bg-default-foreground text-small font-medium text-background"
                isLoading={isSubmitting}
                startContent={<Icon icon="ri:google-fill" width={24} />}
                onPress={handleGoogleSignIn}
              >
                {authMessages.authentication.continueWithGoogle}
              </Button>
              {orDivider}
              <m.div
                animate="visible"
                className="flex flex-col gap-y-2"
                exit="hidden"
                initial="hidden"
                variants={variants}
              >
                <div className="flex flex-col gap-2">
                  <Button
                    fullWidth
                    className="border-1 text-small font-medium"
                    startContent={<Icon className="pointer-events-none text-2xl" icon="solar:letter-bold" />}
                    type="button"
                    variant="bordered"
                    onPress={() => {
                      setIsFormVisible(true);
                      setError("");
                    }}
                  >
                    {authMessages.authentication.continueWithEmail}
                  </Button>
                </div>
                <TermsAgreement className="mt-3" />
              </m.div>
            </>
          )}
        </LazyMotion>
      </AnimatePresence>
    </ResizablePanel>
  );
}
