import { CONFIG } from "@/modules/global/config/env";

export const AUTH_URLS = {
  GOOGLE_AUTH_API_URL: `${CONFIG.DJANGO_BACKEND_URL}/api/auth/google/`,
};
