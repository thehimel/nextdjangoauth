import { useTranslations } from "next-intl";

export type AuthMessages = ReturnType<typeof useAuthMessages>;

export const useAuthMessages = () => {
  const t = useTranslations("authMessages");

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
      emailRegisteredWithEmailLogin: (emailText: string) =>
        t("authentication.emailRegisteredWithEmailLogin", { emailText: emailText }),
      emailRegisteredWithSocialLogin: (provider: string) =>
        t("authentication.emailRegisteredWithSocialLogin", { provider: provider }),
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
      areYouSure: (name: string) => t("logoutPage.areYouSure", { name }),
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
