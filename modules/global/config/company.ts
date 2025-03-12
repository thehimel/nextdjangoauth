import { siteConfig } from "@/modules/global/config/site";

const contactEmail = process.env.CONTACT_EMAIL || "contact@example.com";

export const companyInfo = {
  name: process.env.COMPANY_NAME || siteConfig.name,
  country: process.env.COUNTRY_NAME || "Country",
  contact: {
    privacyEmail: process.env.PRIVACY_EMAIL || contactEmail,
    dataProtectionEmail: process.env.PRIVACY_EMAIL || contactEmail,
    legalEmail: process.env.PRIVACY_EMAIL || contactEmail,
  },
};
