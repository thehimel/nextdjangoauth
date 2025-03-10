"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useIsSSR } from "@react-aria/ssr";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { PuffLoader } from "react-spinners";

import { Colors, Themes } from "@/modules/theme/constants";
import { siteConfig } from "@/modules/global/config/site";
import { AuthText } from "@/modules/auth/settings";

const AuthButton = () => {
  const { theme } = useTheme();
  const isSSR = useIsSSR();
  const color = theme === Themes.LIGHT || isSSR ? Colors.BLACK : Colors.WHITE;

  const { status } = useSession();

  return (
    <>
      {status === "loading" && (
        <Button className="text-sm font-normal text-default-600 bg-default-100" variant="flat">
          <PuffLoader color={color} size={24} />
        </Button>
      )}
      {status === "unauthenticated" && (
        <Button
          as={Link}
          href={siteConfig.links.signin}
          startContent={<Icon icon="line-md:login" width={20} />}
          variant="flat"
        >
          {AuthText.LogIn}
        </Button>
      )}
      {status === "authenticated" && (
        <Button
          as={Link}
          href={siteConfig.links.signout}
          startContent={
            <Icon className="rotate-180 text-default-500" icon="solar:minus-circle-line-duotone" width={24} />
          }
          variant="flat"
        >
          {AuthText.LogOut}
        </Button>
      )}
    </>
  );
};

export default AuthButton;
