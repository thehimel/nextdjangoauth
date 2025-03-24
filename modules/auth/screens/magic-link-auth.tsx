"use client";

import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";

import { AuthMessages } from "@/modules/auth/hooks/useAuthMessages";
import { handleEmailBlur } from "@/modules/auth/validators/emailValidator";
import { requestMagicLink } from "@/modules/auth/services/requestMagicLink";

export interface MagicLinkAuthProps {
  isEnabled?: boolean;
  callbackUrl?: string;
  buttonText?: string;
  backButtonText?: string;
  authMessages: AuthMessages;
  providerId?: string;
  onBackPress?: () => void;
  isLoading?: boolean;
  onAuthAttempt?: () => void;
}

const MagicLinkAuth: React.FC<MagicLinkAuthProps> = ({
  isEnabled = true,
  callbackUrl = "/",
  buttonText = "Continue with Email",
  backButtonText = "Other Login Options",
  authMessages,
  providerId = "magic-link",
  onBackPress = () => {},
  isLoading = false,
  onAuthAttempt = () => {},
}) => {
  // States for form handling
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();

  // States for verification step
  const [currentStep, setCurrentStep] = React.useState("email");
  const [emailSent, setEmailSent] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState("");
  const [verificationCodeError, setVerificationCodeError] = React.useState("");
  const [canTryAgain, setCanTryAgain] = React.useState(false);
  const [countdown, setCountdown] = React.useState(120);

  // Animation variants
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 10 },
  };

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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setEmailError("");
    setEmail(event.target.value);
  };

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setEmailError(authMessages.validationErrors.emailValidationError);

      return;
    }

    try {
      setIsSubmitting(true);
      onAuthAttempt();
      setError("");

      const response = await requestMagicLink(email, authMessages);

      if (response.success) {
        setEmailSent(true);
        setCurrentStep("verification");
        setCanTryAgain(false);
        setCountdown(120);
      } else {
        setError(response.error?.email || response.error?.message || response.message);
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
      onAuthAttempt();
      setError("");

      const result = await signIn(providerId, {
        token: verificationCode,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setVerificationCodeError(authMessages.validationErrors.verificationCodeValidationError);
        setEmailSent(false);
      } else {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setError(authMessages.magicLink.failedToVerifyCodeError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToEmail = () => {
    setCurrentStep("email");
    setVerificationCode("");
    setError("");
    setCanTryAgain(false);
    setCountdown(120);
  };

  if (!isEnabled) return null;

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence initial={false} mode="popLayout">
        <m.div animate="visible" className="flex flex-col gap-y-3" exit="hidden" initial="hidden" variants={variants}>
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
                onBlur={() => handleEmailBlur(email, setEmailError, authMessages.validationErrors.emailValidationError)}
                onChange={handleEmailChange}
              />
              <Button
                fullWidth
                className="bg-default-foreground text-small font-medium text-background"
                isDisabled={!email || !!emailError}
                isLoading={isSubmitting || isLoading}
                type="submit"
              >
                {buttonText}
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
                  isLoading={isSubmitting || isLoading}
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
                    : `Try Again (${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, "0")})`}
                </Button>
              </Form>
            </>
          )}

          {currentStep === "email" && onBackPress && (
            <Button
              fullWidth
              className="border-1 text-small font-medium mt-2"
              startContent={<Icon className="text-default-500" icon="solar:arrow-left-linear" width={18} />}
              variant="bordered"
              onPress={onBackPress}
            >
              {backButtonText}
            </Button>
          )}

          {error && (
            <div className="p-4 my-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800">
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
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
};

export default MagicLinkAuth;
