"use client";

import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { PuffLoader } from "react-spinners";

import { Logo } from "@/components/icons";

export default function SignInPage() {
  const { theme } = useTheme();
  const color = theme === "light" ? "black" : "white";

  const { status, data: session } = useSession();
  const router = useRouter();

  const firstName = session?.user?.name?.split(" ")[0] || "";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <>
      <div className="flex flex-col items-center">
        <Logo className="" size={60} />
        <p className="text-xl font-medium mt-2">Sign Out</p>
        {status === "authenticated" && (
          <p className="text-small text-default-500 mt-2">
            Are you sure you want to sign out{firstName && ` ${firstName}`}?
          </p>
        )}
      </div>
      {status === "loading" && (
        <div className="flex flex-col items-center">
          <PuffLoader color={color} size={24} />
        </div>
      )}
      {status === "authenticated" && (
        <div className="flex flex-col gap-2">
          <Button
            key="signout"
            color="danger"
            startContent={<Icon className="rotate-180" icon="solar:minus-circle-line-duotone" width={24} />}
            variant="flat"
            onClick={() => signOut({ redirectTo: "/" })}
          >
            Confirm
          </Button>
          <Button
            key="cancel"
            as={Link}
            color="success"
            href={"/"}
            startContent={<Icon icon="radix-icons:home" width={20} />}
            variant="flat"
          >
            Cancel
          </Button>
        </div>
      )}
    </>
  );
}
