import { CONFIG } from "@/modules/global/config/env";

export type AppConfig = typeof appConfig;

export const appConfig = {
  name: CONFIG.SITE_NAME,
  shortName: CONFIG.SITE_SHORTNAME,
  description: "A secure authentication solution built with Next.js and Django REST framework.",
};
