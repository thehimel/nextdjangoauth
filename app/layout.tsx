import "@/styles/globals.css";
import CookieConsent from "@/modules/legal/components/cookie-consent";

import { Metadata, Viewport } from "next";
import clsx from "clsx";
import React from "react";

import { Providers } from "./providers";

import { Colors, DEFAULT_THEME } from "@/modules/theme/constants";
import { siteConfig } from "@/modules/global/config/site";
import { fontSans } from "@/modules/global/config/fonts";
import { Navbar } from "@/modules/global/components/navbar";
import { Footer } from "@/modules/global/components/footer";

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
            <main className="container mx-auto max-w-7xl px-6 flex-grow">{children}</main>
            <Footer />
            <CookieConsent />
          </div>
        </Providers>
      </body>
    </html>
  );
}
