"use client";

import React from "react";

import AuthContainer from "@/modules/auth/screens/auth-container";

export default function LogInScreenUpdated() {
  // Configure which authentication methods to enable
  const authOptions = {
    google: true, // Set false to disable Google authentication
    magicLink: true, // Set false to disable Magic Link authentication
  };

  // Configure provider IDs - useful if you need to use custom provider names
  const providerId = {
    google: "google",
    magicLink: "magic-link",
  };

  return <AuthContainer authOptions={authOptions} providerId={providerId} />;
}
