"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function VerifyRequestPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  return (
    <>
      <div className="flex justify-center pb-0 pt-4">
        <h1 className="text-2xl font-bold">Check your email</h1>
      </div>

      <div className="flex flex-col items-center gap-4 p-8">
        <div className="p-4 bg-blue-50 rounded-full">
          <Icon className="w-12 h-12 text-blue-500" icon="mdi:email-outline" />
        </div>

        <p className="text-center">
          A sign in link has been sent to <strong>{email}</strong>. Please check your inbox and click the link to
          continue.
        </p>

        <div className="w-full pt-4">
          <Link passHref href="/auth/signin">
            <Button fullWidth color="primary" variant="flat">
              Back to sign in
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
