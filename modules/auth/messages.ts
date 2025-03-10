export const AuthMessages = {
  LOADING: "Loading...",

  GOOGLE_AUTH_UNAVAILABLE: "Google authentication is currently unavailable. Please try again later.",

  EMAIL_VALIDATION_ERROR: "Please enter a valid email address.",
  VERIFICATION_CODE_EMPTY_ERROR: "Please enter a valid verification code.",
  VERIFICATION_CODE_VALIDATION_ERROR: "Sorry, we couldn't verify this code. Please try again or request a new one.",
  LINK_VERIFICATION_IN_PROGRESS: "Almost there! Verifying your link!",

  REQUEST_MAGIC_LINK_SUCCESS:
    "Your sign-in link has been sent to your email. Please check your inbox and click on the link to log in. " +
    "If it doesn’t show up, check your spam folder or try sending it again.",
  REQUEST_MAGIC_LINK_ERROR: "Sorry, we're having trouble sending the verification link now. Please try again later.",
  MAGIC_LINK_VERIFICATION_FAILED: "Magic link verification failed:",

  VERIFY_MAGIC_LINK_ERROR:
    "The verification link is either invalid or has expired. " +
    "Please try signing in with your email again to request a new link.",

  ACCESS_DENIED: "You do not have permission to log in.",
  CONFIGURATION_ERROR: "There is a problem with the authentication configuration.",
  OAUTH_CALLBACK_ERROR: "There was a problem with the OAuth provider.",

  UNEXPECTED_ERROR: "An unexpected error occurred. Please try again.",
};

export const getSignInErrorMessage = (error: string | null): string => {
  const errorMessages: { [key: string]: string } = {
    google_auth_unavailable: AuthMessages.GOOGLE_AUTH_UNAVAILABLE,
    Verification: AuthMessages.VERIFY_MAGIC_LINK_ERROR,
    AccessDenied: AuthMessages.ACCESS_DENIED,
    Configuration: AuthMessages.CONFIGURATION_ERROR,
    OAuthCallback: AuthMessages.OAUTH_CALLBACK_ERROR,
  };

  return error ? errorMessages[error] || AuthMessages.UNEXPECTED_ERROR : AuthMessages.UNEXPECTED_ERROR;
};
