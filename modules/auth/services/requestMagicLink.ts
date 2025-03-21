"use server";

import axios, { AxiosError } from "axios";

import { getError } from "@/modules/global/errors";
import { AuthUrls } from "@/modules/auth/constants/urls";
import { useAuthMessages } from "@/modules/auth/hooks/useAuthMessages";

export interface RequestMagicLinkResponseInterface {
  success: boolean;
  message: string;
  error?: {
    code?: string;
    provider?: string;
    message?: string;
    email?: string;
  };
}

export const requestMagicLink = async (
  email: string,
  authMessages: ReturnType<typeof useAuthMessages>,
): Promise<RequestMagicLinkResponseInterface> => {
  try {
    await axios.post(
      AuthUrls.REQUEST_MAGIC_LINK_URL,
      { email: email, login_path: AuthUrls.SIGN_IN_URL },
      { headers: { "Content-Type": "application/json" } },
    );

    return { success: true, message: authMessages.magicLink.requestMagicLinkSuccess };
  } catch (error) {
    const refinedError = getError(error as AxiosError);

    return {
      success: false,
      message: authMessages.magicLink.requestMagicLinkError,
      error: {
        code: refinedError.code as string,
        provider: refinedError.provider as string,
        message: refinedError.message,
        email: Array.isArray(refinedError.email) ? refinedError.email[0] : undefined,
      },
    };
  }
};
