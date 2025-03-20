"use client";

import React, { useTransition } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, SharedSelection } from "@heroui/react";
import { Icon } from "@iconify/react";

import { setUserLocale } from "@/i18n/locale";
import { Locale } from "@/i18n/config";
import { LanguageIcon } from "@/modules/global/components/icons";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string; iconName: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({ defaultValue, items, label }: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(keys: SharedSelection) {
    const locale = Array.from(keys)[0] as Locale;

    startTransition(() => {
      void setUserLocale(locale);
    });
  }

  return (
    <Dropdown isDisabled={isPending} placement="bottom-end">
      <DropdownTrigger name={label}>
        <button>
          <LanguageIcon className="text-default-500" />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        selectedKeys={[defaultValue]}
        selectionMode="single"
        variant="flat"
        onSelectionChange={onChange}
      >
        {items.map((item) => (
          <DropdownItem key={item.value} startContent={<Icon icon={item.iconName} width={20} />}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
