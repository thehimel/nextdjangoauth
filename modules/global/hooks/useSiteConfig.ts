import { useTranslations } from "next-intl";

export const useSiteConfig = () => {
  const t = useTranslations("SiteConfig");

  return {
    navItems: [
      { label: t("navItems.home"), href: "/" },
      { label: t("navItems.docs"), href: "/docs" },
      { label: t("navItems.blog"), href: "/blog" },
      { label: t("navItems.about"), href: "/about" },
    ],
    navMenuItems: [
      { label: t("navMenuItems.profile"), href: "/profile" },
      { label: t("navMenuItems.dashboard"), href: "/dashboard" },
      { label: t("navMenuItems.projects"), href: "/projects" },
      { label: t("navMenuItems.team"), href: "/team" },
      { label: t("navMenuItems.calendar"), href: "/calendar" },
      { label: t("navMenuItems.settings"), href: "/settings" },
      { label: t("navMenuItems.helpAndFeedback"), href: "/help-feedback" },
      { label: t("navMenuItems.logout"), href: "/logout" },
    ],
  };
};
