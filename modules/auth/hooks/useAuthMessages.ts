import { useTranslations } from "next-intl";

// Assuming you have access to `session` from context, props, or a hook
export const useAuthMessages = (session?: any) => {
  const t = useTranslations("authMessages");

  // Derive first name from session, if available
  const firstName = session?.user?.name?.split(" ")[0] || "";

  return {
    general: {
      loading: t("general.loading"),
      unexpectedError: t("general.unexpectedError"),
    },
    authentication: {
      logIn: t("authentication.logIn"),
      logOut: t("authentication.logOut"),
      googleAuthUnavailable: t("authentication.googleAuthUnavailable"),
      accessDenied: t("authentication.accessDenied"),
      configurationError: t("authentication.configurationError"),
      oAuthCallbackError: t("authentication.oauthCallbackError"),
      continueWithGoogle: t("authentication.continueWithGoogle"),
      continueWithEmail: t("authentication.continueWithEmail"),
      otherLoginOptions: t("authentication.otherLoginOptions"),
    },
    validationErrors: {
      emailValidationError: t("validationErrors.emailValidationError"),
      verificationCodeEmptyError: t("validationErrors.verificationCodeEmptyError"),
      verificationCodeValidationError: t("validationErrors.verificationCodeValidationError"),
    },
    magicLink: {
      linkVerificationInProgress: t("magicLink.linkVerificationInProgress"),
      requestMagicLinkSuccess: t("magicLink.requestMagicLinkSuccess"),
      requestMagicLinkError: t("magicLink.requestMagicLinkError"),
      failedToSendMagicLinkError: t("magicLink.failedToSendMagicLinkError"),
      verifyMagicLinkError: t("magicLink.verifyMagicLinkError"),
      failedToVerifyCodeError: t("magicLink.failedToVerifyCodeError"),
      verificationCodeSent: t("magicLink.verificationCodeSent"),
      continue: t("magicLink.continue"),
    },
    logoutPage: {
      areYouSure: t("logoutPage.areYouSure", { name: firstName }),
      goBack: t("logoutPage.goBack"),
      confirm: t("logoutPage.confirm"),
    },
    loginForm: {
      emailLabel: t("loginForm.emailLabel"),
      emailPlaceholder: t("loginForm.emailPlaceholder"),
      verificationCodeLabel: t("loginForm.verificationCodeLabel"),
      verificationCodePlaceholder: t("loginForm.verificationCodePlaceholder"),
    },
  };
};
