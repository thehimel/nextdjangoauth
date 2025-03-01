"use client";

import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { getProviders, signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

import { Logo } from "@/modules/global/components/icons";

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null);

  const { theme } = useTheme();
  const color = theme === "light" ? "black" : "white";

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };

    fetchProviders().then(() => null);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <Logo className="" size={60} />
        <p className="text-xl font-medium mt-2">Sign In</p>
        <p className="text-small text-default-500 mt-2">Sign in to your account to continue</p>
      </div>
      {!providers && (
        <div className="flex flex-col items-center">
          <PuffLoader color={color} size={24} />
        </div>
      )}
      {providers && (
        <div className="flex flex-col gap-2">
          {Object.values(providers).map((provider: any) => (
            <Button
              key={provider.name}
              startContent={<Icon icon="flat-color-icons:google" width={24} />}
              variant="flat"
              onClick={() => signIn(provider.id, { redirectTo: "/" })}
            >
              Sign in with {provider.name}
            </Button>
          ))}
        </div>
      )}
    </>
  );
}
