import { appConfig } from "@/modules/global/config/site";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@example.com";

export const companyInfo = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || appConfig.name,
  country: process.env.NEXT_PUBLIC_COUNTRY_NAME || "Country",
  contact: {
    privacyEmail: process.env.NEXT_PUBLIC_PRIVACY_EMAIL || contactEmail,
    dataProtectionEmail: process.env.NEXT_PUBLIC_PRIVACY_EMAIL || contactEmail,
    legalEmail: process.env.NEXT_PUBLIC_PRIVACY_EMAIL || contactEmail,
  },
};
