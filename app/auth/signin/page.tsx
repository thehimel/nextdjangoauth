"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Tabs, Tab } from "@heroui/tabs";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Icon } from "@iconify/react";

import LoadingScreen from "@/modules/auth/components/loading-screen";
import { handleEmailBlur } from "@/modules/auth/validators/emailValidator";
import { requestMagicLink } from "@/modules/auth/services/requestMagicLink";
import { authMessages, getSignInErrorMessage } from "@/modules/auth/messages";

enum TabKeys {
  GOOGLE = "google",
  EMAIL = "email",
}

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Memoize URL params to prevent unnecessary re-renders
  const urlParams = useMemo(
    () => ({
      errorType: searchParams.get("error"),
      token: searchParams.get("token"),
      callbackUrl: searchParams.get("callbackUrl") || "/",
      email: searchParams.get("email") || "",
    }),
    [searchParams],
  );

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedTabKey, setSelectedTabKey] = useState(TabKeys.GOOGLE);

  // For magic link token verification
  const [verifyingToken, setVerifyingToken] = useState(false);

  const getErrorMessage = useCallback(() => {
    if (urlParams.errorType === "email_registered_with_email_login") {
      return `This email ${urlParams.email ? `(${urlParams.email}) ` : ""}is registered with email authentication. Please sign in with your email or use a different account.`;
    }

    return getSignInErrorMessage(urlParams.errorType);
  }, [urlParams]);

  useEffect(() => {
    if (urlParams.errorType) {
      setError(getErrorMessage());
    }
  }, [urlParams.errorType, getErrorMessage]);

  // Handle magic link token verification
  useEffect(() => {
    if (urlParams.token) {
      setVerifyingToken(true);
      // Verify the token by signing in with credentials
      signIn("magic-link", {
        token: urlParams.token,
        redirect: false, // prevent automatic redirect
        callbackUrl: urlParams.callbackUrl,
      })
        .then((response) => {
          // If there's an error (like invalid token), show a custom message
          if (response?.error) {
            setError(authMessages.VERIFY_MAGIC_LINK_ERROR);
            setSelectedTabKey(TabKeys.EMAIL);
            setVerifyingToken(false);
          } else {
            // Successful authentication - redirect to the callback URL using Next.js router
            router.push(urlParams.callbackUrl);
          }
        })
        .catch((error) => {
          console.error("Error verifying magic link token:", error);
          setError(authMessages.VERIFY_MAGIC_LINK_ERROR);
          setSelectedTabKey(TabKeys.EMAIL);
          setVerifyingToken(false);
        });
    }
  }, [urlParams.token, urlParams.callbackUrl, router]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setEmailError("");
    setEmail(e.target.value);
  };

  // Handle magic link request using your existing service
  const handleMagicLinkRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
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
      } else {
        console.log("Error sending magic link:", response);
        setError(response.error?.email || response.error?.message || response.message);
      }

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error sending magic link:", error);
      setError("Failed to send magic link. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Handle Google sign in
  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    signIn("google", { callbackUrl: urlParams.callbackUrl });
  };

  // If we're verifying a token, show loading state
  if (verifyingToken) {
    return <LoadingScreen message={authMessages.LINK_VERIFICATION_IN_PROGRESS} />;
  }

  return (
    <>
      <div className="flex justify-center pb-0">
        <h1 className="text-2xl font-bold">Sign In</h1>
      </div>

      <div className="flex flex-col gap-6 p-6">
        {error && <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md text-center">{error}</div>}

        {emailSent ? (
          <div className="flex flex-col items-center gap-4">
            <div className="p-2 bg-green-100 rounded-full">
              <Icon className="w-6 h-6 text-green-600" icon="mdi:check" />
            </div>
            <h3 className="text-xl font-medium">Check your email</h3>
            <p className="text-center text-gray-600">
              {successMessage || `We've sent a magic link to ${email}. Click the link to sign in.`}
            </p>
            <Button className="mt-4" color="primary" variant="flat" onPress={() => setEmailSent(false)}>
              Back to sign in
            </Button>
          </div>
        ) : (
          <Tabs
            fullWidth
            aria-label="Sign in options"
            defaultSelectedKey={selectedTabKey}
            onSelectionChange={() => setError("")}
          >
            <Tab key={TabKeys.GOOGLE} title="Google">
              <div className="flex flex-col gap-4">
                <Button
                  fullWidth
                  isLoading={isSubmitting}
                  startContent={<Icon className="w-5 h-5" icon="flat-color-icons:google" />}
                  variant="bordered"
                  onPress={handleGoogleSignIn}
                >
                  Continue with Google
                </Button>
              </div>
            </Tab>
            <Tab key={TabKeys.EMAIL} title="Email">
              <form className="flex flex-col gap-4" onSubmit={handleMagicLinkRequest}>
                <Input
                  isRequired
                  errorMessage={emailError}
                  isInvalid={!!emailError}
                  label="Email"
                  placeholder="Enter your email"
                  startContent={<Icon className="text-gray-400" icon="mdi:email-outline" />}
                  type="email"
                  value={email}
                  onBlur={() => handleEmailBlur(email, setEmailError)}
                  onChange={handleEmailChange}
                />
                <Button fullWidth color="primary" isLoading={isSubmitting} type="submit">
                  Continue with Email
                </Button>
              </form>
            </Tab>
          </Tabs>
        )}
      </div>

      <div className="flex text-center justify-center text-sm text-gray-500 pb-0">
        By signing in, you agree to our Terms and Privacy Policy.
      </div>
    </>
  );
}
