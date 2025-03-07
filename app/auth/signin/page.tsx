"use client";

import React from "react";
import { Button, Input, Divider, ResizablePanel, Form } from "@heroui/react";
import { AnimatePresence, m, domAnimation, LazyMotion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import LoadingScreen from "@/modules/auth/components/loading-screen";
import { handleEmailBlur } from "@/modules/auth/validators/emailValidator";
import { requestMagicLink } from "@/modules/auth/services/requestMagicLink";
import { authMessages, getSignInErrorMessage } from "@/modules/auth/messages";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for UI control
  const [isFormVisible, setIsFormVisible] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState<"email" | "verification">("email");

  // Form state
  const [email, setEmail] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isVerificationCodeValid, setIsVerificationCodeValid] = React.useState(true);

  // Status state
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const [error, setError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
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
      const errorMessage =
        urlParams.errorType === "email_registered_with_email_login"
          ? `This email ${urlParams.email ? `(${urlParams.email}) ` : ""}is registered with email sign-in. Please continue with email or use a different account.`
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
      signIn("magic-link", {
        token: urlParams.token,
        redirect: false,
        callbackUrl: urlParams.callbackUrl,
      })
        .then((response) => {
          if (response?.error) {
            setError(authMessages.VERIFY_MAGIC_LINK_ERROR);
            setVerifyingToken(false);
          } else {
            router.push(urlParams.callbackUrl);
          }
        })
        .catch((error) => {
          console.error("Error verifying magic link token:", error);
          setError(authMessages.VERIFY_MAGIC_LINK_ERROR);
          setVerifyingToken(false);
        });
    }
  }, [urlParams.token, urlParams.callbackUrl, router]);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !email.includes("@")) {
      setIsEmailValid(false);
      setError("Please enter a valid email address");

      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await requestMagicLink(email);

      if (response.success) {
        setEmailSent(true);
        setSuccessMessage(response.message);
        setCurrentStep("verification");
        setCanTryAgain(false);
        setCountdown(120);
      } else {
        setError(response.error?.email || response.error?.message || response.message);
      }
    } catch (error) {
      console.error("Error sending magic link:", error);
      setError("Failed to send magic link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!verificationCode) {
      setIsVerificationCodeValid(false);
      setError("Please enter the verification code");

      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Use the same signIn method as the magic link, but with the verification code as token
      const result = await signIn("magic-link", {
        token: verificationCode, // Use the verification code as the token
        redirect: false,
        callbackUrl: urlParams.callbackUrl,
      });

      if (result?.error) {
        setError("Invalid verification code. Please try again.");
        setEmailSent(false);
        setIsVerificationCodeValid(false);
      } else {
        router.push(urlParams.callbackUrl);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setError("Failed to verify code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    signIn("google", { callbackUrl: urlParams.callbackUrl });
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
    return <LoadingScreen message={authMessages.LINK_VERIFICATION_IN_PROGRESS} />;
  }

  return (
    <ResizablePanel>
      <h1 className="mb-4 text-center text-xl font-medium">Sign In</h1>

      {error && (
        <div className="p-4 mb-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-center">
            <div className="flex-shrink-0">
              <Icon
                aria-hidden="true"
                className="h-5 w-5 text-red-500 dark:text-red-400"
                icon="heroicons:exclamation-circle"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
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
                    isRequired
                    errorMessage={!isEmailValid ? "Please enter a valid email" : undefined}
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    variant="bordered"
                    onBlur={() =>
                      handleEmailBlur(email, (message) => {
                        setIsEmailValid(!message);
                        setError(message || "");
                      })
                    }
                    onValueChange={(value) => {
                      setEmail(value);
                      setIsEmailValid(true);
                      setError("");
                    }}
                  />
                  <Button className="w-full" color="primary" isLoading={isSubmitting} type="submit">
                    Continue with Email
                  </Button>
                </Form>
              ) : (
                <>
                  {emailSent && (
                    <div className="p-4 mb-1 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-center">
                        <div className="flex-shrink-0">
                          <Icon
                            aria-hidden="true"
                            className="h-5 w-5 text-green-500 dark:text-green-400"
                            icon="heroicons:check-circle"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-600 dark:text-green-400">
                            We have sent a verification code to {email}. You can either enter the code below or click in
                            the email.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form validationBehavior="native" onSubmit={handleVerificationSubmit}>
                    <Input
                      isRequired
                      errorMessage={!isVerificationCodeValid ? "Please enter a valid code" : undefined}
                      label="Verification Code"
                      name="verificationCode"
                      type="text"
                      value={verificationCode}
                      variant="bordered"
                      onValueChange={(value) => {
                        setVerificationCode(value);
                        setIsVerificationCodeValid(true);
                        setError("");
                      }}
                    />
                    <Button className="w-full" color="primary" isLoading={isSubmitting} type="submit">
                      Continue
                    </Button>
                    <Button className="w-full" isDisabled={!canTryAgain} variant="flat" onPress={handleBackToEmail}>
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
                    startContent={<Icon className="text-default-500" icon="solar:arrow-left-linear" width={18} />}
                    variant="flat"
                    onPress={() => {
                      setIsFormVisible(false);
                      setCurrentStep("email");
                      setError("");
                    }}
                  >
                    Other Login options
                  </Button>
                </>
              )}
            </m.div>
          ) : (
            <>
              <Button
                fullWidth
                isLoading={isSubmitting}
                startContent={<Icon icon="flat-color-icons:google" width={24} />}
                variant="flat"
                onPress={handleGoogleSignIn}
              >
                Continue with Google
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
                    color="primary"
                    startContent={<Icon className="pointer-events-none text-2xl" icon="solar:letter-bold" />}
                    type="button"
                    onPress={() => {
                      setIsFormVisible(true);
                      setError("");
                    }}
                  >
                    Continue with Email
                  </Button>
                </div>
                <p className="mt-3 text-center text-small">
                  By signing in, you agree to our Terms and Privacy Policy.
                </p>
              </m.div>
            </>
          )}
        </LazyMotion>
      </AnimatePresence>
    </ResizablePanel>
  );
}
