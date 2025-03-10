import { CONFIG } from "@/modules/global/config/env";

export const authUrls = {
  SIGN_IN_URL: "/auth/login",
  SIGN_OUT_URL: "/auth/logout",
  ERROR_URL: "/auth/login",
  GOOGLE_AUTH_API_URL: `${CONFIG.DJANGO_BACKEND_URL}/api/auth/google/`,
  REQUEST_MAGIC_LINK_URL: `${CONFIG.DJANGO_BACKEND_URL}/api/auth/magic-link/`,
  VERIFY_MAGIC_LINK_URL: `${CONFIG.DJANGO_BACKEND_URL}/api/auth/magic-link/verify/`,
};
