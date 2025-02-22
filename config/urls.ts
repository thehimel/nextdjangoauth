import { CONFIG } from "@/config/env";

export const URLS = {
  SERVER: {
    GOOGLE_AUTH_API_URL: `${CONFIG.DJANGO_BACKEND_URL}/api/auth/google/`,
  },
};
