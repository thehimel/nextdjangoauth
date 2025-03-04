export const authMessages = {
  LOADING: "Loading...",

  GOOGLE_AUTH_UNAVAILABLE: "Google authentication is currently unavailable. Please try again later.",

  EMAIL_VALIDATION_ERROR: "Please enter a valid email address.",
  LINK_VERIFICATION_IN_PROGRESS: "Almost there! Verifying your link!",

  REQUEST_MAGIC_LINK_SUCCESS:
    "Your sign-in link has been sent to your email. Please check your inbox and click on the link to log in. " +
    "If it doesn’t show up, check your spam folder or try sending it again.",
  REQUEST_MAGIC_LINK_ERROR: "Sorry, we're having trouble sending the verification link now. Please try again later.",

  VERIFY_MAGIC_LINK_ERROR:
    "The verification link is either invalid or has expired. " +
    "Please try signing in with your email again to request a new link.",

  ACCESS_DENIED: "You do not have permission to sign in.",
  CONFIGURATION_ERROR: "There is a problem with the authentication configuration.",
  OAUTH_CALLBACK_ERROR: "There was a problem with the OAuth provider.",

  UNEXPECTED_ERROR: "An unexpected error occurred. Please try again.",
};

export const getSignInErrorMessage = (error: string | null): string => {
  const errorMessages: { [key: string]: string } = {
    google_auth_unavailable: authMessages.GOOGLE_AUTH_UNAVAILABLE,
    Verification: authMessages.VERIFY_MAGIC_LINK_ERROR,
    AccessDenied: authMessages.ACCESS_DENIED,
    Configuration: authMessages.CONFIGURATION_ERROR,
    OAuthCallback: authMessages.OAUTH_CALLBACK_ERROR,
  };

  return error ? errorMessages[error] || authMessages.UNEXPECTED_ERROR : authMessages.UNEXPECTED_ERROR;
};
