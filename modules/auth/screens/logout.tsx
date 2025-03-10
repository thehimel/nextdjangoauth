"use client";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

import { Logo } from "@/modules/global/components/icons";
import { AuthText } from "@/modules/auth/constants";
import { usePreviousUrl } from "@/modules/auth/hooks/usePreviousUrl";

export default function LogOutScreen(): React.ReactElement {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const { status, data: session } = useSession();
  const router = useRouter();
  const { goBack } = usePreviousUrl("/");

  const firstName = session?.user?.name?.split(" ")[0] || "";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Get color only after mounting
  const color = mounted ? (theme === "light" ? "black" : "white") : "black"; // default to black

  return (
    <>
      <div className="flex flex-col items-center">
        <Logo className="" size={60} />
        <p className="text-xl font-medium mt-2">{AuthText.LogOut}</p>
        {status === "authenticated" && (
          <p className="text-small text-default-500 mt-2 text-center">
            Are you sure you want to log out{firstName && ` ${firstName}`}?
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
            key="go-back"
            color="success"
            startContent={<Icon icon="solar:arrow-left-linear" width={20} />}
            variant="flat"
            onPress={goBack}
          >
            Go Back
          </Button>
          <Button
            key="confirm"
            color="danger"
            startContent={<Icon icon="twemoji:broken-heart" width={20} />}
            variant="flat"
            onPress={() => signOut({ redirectTo: "/" })}
          >
            Confirm
          </Button>
        </div>
      )}
    </>
  );
}
