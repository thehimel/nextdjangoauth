"use client";

import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Themes } from "@/components/theme/constants";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleOnPress = () => {
    setTheme(theme === Themes.DARK ? Themes.LIGHT : Themes.DARK);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themeIcon = theme === Themes.DARK ? "solar:sun-linear" : "radix-icons:moon";

  return (
    <Button isIconOnly radius="full" variant="light" onPress={handleOnPress}>
      <Icon className="text-default-500" icon={themeIcon} width={22} />
    </Button>
  );
}
