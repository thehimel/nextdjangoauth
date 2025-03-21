import { useAuthMessages } from "./useAuthMessages";

export const useSignInErrorMessage = () => {
  const authMessages = useAuthMessages();

  return (error: string | null): string => {
    const errorMessages: { [key: string]: string } = {
      google_auth_unavailable: authMessages.authentication.googleAuthUnavailable,
      Verification: authMessages.magicLink.verifyMagicLinkError,
      AccessDenied: authMessages.authentication.accessDenied,
      Configuration: authMessages.authentication.configurationError,
      OAuthCallback: authMessages.authentication.oAuthCallbackError,
    };

    return error ? errorMessages[error] || authMessages.general.unexpectedError : authMessages.general.unexpectedError;
  };
};
