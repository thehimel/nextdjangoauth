"use server";

import { cookies } from "next/headers";

import { Locale, defaultLocale } from "@/i18n/config";

// In this example, the locale is retrieved from a cookie.
// Alternatively, it could be obtained from a database, backend service, or another source.
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
