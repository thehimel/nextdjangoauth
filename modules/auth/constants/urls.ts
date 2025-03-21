import { CONFIG } from "@/modules/global/config/env";

export const AuthUrls = {
  SIGN_IN_URL: "/auth/login",
  SIGN_OUT_URL: "/auth/logout",
  ERROR_URL: "/auth/login",
  SIGN_IN_API_URL: "/api/auth/signin",
  SIGN_OUT_API_URL: "/api/auth/signout",
  GOOGLE_AUTH_API_URL: `${CONFIG.DJANGO_BACKEND_URL}/api/auth/google/`,
  REQUEST_MAGIC_LINK_URL: `${CONFIG.DJANGO_BACKEND_URL}/api/auth/magic-link/`,
  VERIFY_MAGIC_LINK_URL: `${CONFIG.DJANGO_BACKEND_URL}/api/auth/magic-link/verify/`,
};

export const LegalUrls = {
  TERMS_URL: "/legal/terms",
  PRIVACY_URL: "/legal/privacy",
};
