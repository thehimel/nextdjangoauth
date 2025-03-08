"use client";

import React from "react";
import { Link } from "@heroui/link";

import { useIsAuthPage } from "@/modules/auth/hooks/useIsAuthPage";
import { HeartFilledIcon } from "@/modules/global/components/icons";

export const Footer = () => {
  const isAuthPage = useIsAuthPage();

  if (isAuthPage) {
    return null;
  }

  return (
    <footer className="w-full flex items-center justify-center py-3">
      <Link className="flex items-center gap-1 text-current" href="/" title="homepage">
        <span className="flex text-default-600">
          Made with <HeartFilledIcon className="text-danger ml-1 mr-1" /> in
        </span>
        <p className="text-primary">Planet Earth</p>
      </Link>
    </footer>
  );
};
