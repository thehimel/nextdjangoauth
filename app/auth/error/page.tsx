"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  // Map error codes to friendly messages
  const getErrorMessage = (error: string) => {
    switch (error) {
      case "Verification":
        return "The verification link is invalid or has expired. Please request a new link.";
      case "AccessDenied":
        return "You do not have permission to sign in.";
      case "Configuration":
        return "There is a problem with the authentication configuration.";
      case "OAuthCallback":
        return "There was a problem with the OAuth provider.";
      default:
        return "An unexpected error occurred during authentication.";
    }
  };

  return (
    <>
      <div className="flex justify-center pb-0 pt-4">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
      </div>

      <div className="flex flex-col items-center gap-4 p-8">
        <div className="p-4 bg-red-50 rounded-full">
          <Icon className="w-12 h-12 text-red-500" icon="mdi:alert" />
        </div>

        <p className="text-center">{getErrorMessage(error as string)}</p>

        <div className="w-full pt-4">
          <Link passHref href="/auth/signin">
            <Button fullWidth color="primary">
              Try Again
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
