import { AxiosError } from "axios";

interface ErrorInterface {
  message?: string;
  [key: string]: string[] | string | boolean | undefined;
}

export const getError = (error: AxiosError): ErrorInterface => {
  const { message, response } = error;

  // Check if response.data is an object and merge it with the message
  const responseError = response?.data && typeof response.data === "object" ? response.data : {};

  return {
    ...responseError,
    message,
  };
};
