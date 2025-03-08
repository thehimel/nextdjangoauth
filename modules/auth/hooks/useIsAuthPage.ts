import { usePathname } from "next/navigation";

import { authUrls } from "@/modules/auth/urls";

const AUTH_PATHS: readonly string[] = [authUrls.SIGN_IN_URL, authUrls.SIGN_OUT_URL] as const;

export const useIsAuthPage = (): boolean => {
  const pathname: string | null = usePathname();

  return AUTH_PATHS.some((path: string): boolean => pathname?.startsWith(path) ?? false);
};
