"use server";

import axios, { AxiosError } from "axios";

import { getError } from "@/modules/global/errors";
import { AuthUrls } from "@/modules/auth/urls";
import { AuthMessages } from "@/modules/auth/messages";

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

export const requestMagicLink = async (email: string): Promise<RequestMagicLinkResponseInterface> => {
  try {
    await axios.post(
      AuthUrls.REQUEST_MAGIC_LINK_URL,
      { email: email },
      { headers: { "Content-Type": "application/json" } },
    );

    return { success: true, message: AuthMessages.REQUEST_MAGIC_LINK_SUCCESS };
  } catch (error) {
    const refinedError = getError(error as AxiosError);

    return {
      success: false,
      message: AuthMessages.REQUEST_MAGIC_LINK_ERROR,
      error: {
        code: refinedError.code as string,
        provider: refinedError.provider as string,
        message: refinedError.message,
        email: Array.isArray(refinedError.email) ? refinedError.email[0] : undefined,
      },
    };
  }
};
