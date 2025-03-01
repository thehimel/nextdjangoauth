import { CONFIG } from "@/config/env";

export const AUTH_URLS = {
  GOOGLE_AUTH_API_URL: `${CONFIG.DJANGO_BACKEND_URL}/api/auth/google/`,
};
