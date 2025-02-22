import { CONFIG } from "@/config/env";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: CONFIG.SITE_NAME,
  shortName: CONFIG.SITE_SHORTNAME,
  description: "A secure authentication solution built with Next.js and Django REST framework.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/",
    twitter: "https://twitter.com/",
    docs: "",
    discord: "https://discord.gg/",
    sponsor: "https://patreon.com/",
    signin: "/api/auth/signin",
    signout: "/api/auth/signout",
  },
};
