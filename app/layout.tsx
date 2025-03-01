import "@/styles/globals.css";

import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import React from "react";

import { Providers } from "./providers";

import { HeartFilledIcon } from "@/modules/global/components/icons";
import { Colors, DEFAULT_THEME } from "@/modules/theme/constants";
import { siteConfig } from "@/modules/global/config/site";
import { fontSans } from "@/modules/global/config/fonts";
import { Navbar } from "@/modules/global/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: Colors.WHITE },
    { media: "(prefers-color-scheme: dark)", color: Colors.BLACK },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: DEFAULT_THEME }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">{children}</main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link className="flex items-center gap-1 text-current" href="/" title="homepage">
                <span className="flex text-default-600">
                  Made with <HeartFilledIcon className="text-danger ml-1 mr-1" /> in
                </span>
                <p className="text-primary">Planet Earth</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
