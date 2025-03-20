import { useLocale, useTranslations } from "next-intl";

import LocaleSwitcherSelect from "@/modules/i18n/components/locale-switcher-select";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: "en",
          label: t("en"),
          iconName: "circle-flags:lang-en-us",
        },
        {
          value: "de",
          label: t("de"),
          iconName: "circle-flags:lang-de",
        },
      ]}
      label={t("label")}
    />
  );
}
