"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { signIn } from "next-auth/react";

const GoogleAuth = ({
  isEnabled = true,
  callbackUrl = "/",
  buttonText = "Continue with Google",
  isLoading = false,
  onAuthAttempt = () => {},
}) => {
  const handleGoogleSignIn = () => {
    onAuthAttempt();
    void signIn("google", { callbackUrl });
  };

  if (!isEnabled) return null;

  return (
    <Button
      fullWidth
      className="bg-default-foreground text-small font-medium text-background"
      isLoading={isLoading}
      startContent={<Icon icon="ri:google-fill" width={24} />}
      onPress={handleGoogleSignIn}
    >
      {buttonText}
    </Button>
  );
};

export default GoogleAuth;
