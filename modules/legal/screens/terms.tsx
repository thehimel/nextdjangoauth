import React from "react";

import { companyInfo } from "@/modules/global/config/company";
import { formatFullDate } from "@/modules/global/utils";
import { TermType } from "@/modules/legal/constants";
import EmailLink from "@/modules/legal/components/email-link";

const TermsAndConditions = () => {
  const companyName: string = companyInfo.name;
  const countryName: string = companyInfo.country;
  const privacyEmail: string = companyInfo.contact.privacyEmail;
  const dataProtectionEmail: string = companyInfo.contact.dataProtectionEmail;
  const legalEmail: string = companyInfo.contact.legalEmail;
  const termText = TermType.Organization;
  const termsAndConditionsUpdateDate: Date = new Date("2025-03-12");

  const h2ClassName = "text-2xl text-center font-bold mb-4";
  const topLevelUlClassName = "list-disc pl-4 space-y-2";
  const secondLevelUlClassName = "list-disc pl-4 space-y-1 pt-1";

  return (
    <div className="max-w-4xl mx-auto pt-12 px-4 sm:px-6 lg:px-8 text-justify">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Terms and Conditions</h1>
        <p className="mt-4 text-lg text-gray-500">Last Updated: {formatFullDate(termsAndConditionsUpdateDate)}</p>
      </div>

      <div className="prose prose-lg prose-indigo mx-auto">
        <section className="mb-10">
          <h2 className={h2ClassName}>1. Introduction</h2>
          <ul className={topLevelUlClassName}>
            <li>
              Welcome to our platform. These Terms and Conditions (&#34;Terms&#34;) govern your access to and use of our
              website, mobile applications, and services (collectively, the &#34;Services&#34;).
            </li>
            <li>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these
              Terms, please do not use our Services.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>2. Definitions</h2>
          <ul className={topLevelUlClassName}>
            <li>
              <strong>&#34;{termText}&#34;</strong> refers to {companyName}, its subsidiaries, affiliates, officers,
              employees, agents, and contractors.
            </li>
            <li>
              <strong>&#34;User&#34;</strong> refers to any individual who accesses or uses our Services, whether
              registered or not.
            </li>
            <li>
              <strong>&#34;Content&#34;</strong> refers to any text, images, videos, audio, or other material that is
              posted, uploaded, or otherwise made available through our Services.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>3. Account Registration</h2>
          <ul className={topLevelUlClassName}>
            <li>
              To access certain features of our Services, you may be required to register for an account. You agree to
              provide accurate, current, and complete information during the registration process and to update such
              information to keep it accurate, current, and complete.
            </li>
            <li>
              You are responsible for safeguarding your password and for all activities that occur under your account.
              You agree to notify us immediately of any unauthorized use of your account.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>4. User Conduct</h2>
          <strong>You agree not to use our Services to:</strong>
          <ul className={topLevelUlClassName}>
            <li>Violate any applicable laws or regulations.</li>
            <li>Infringe the intellectual property rights of others.</li>
            <li>Transmit any material that is defamatory, offensive, or otherwise objectionable.</li>
            <li>Interfere with or disrupt the integrity or performance of our Services.</li>
            <li>Attempt to gain unauthorized access to our Services or related systems.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>5. Intellectual Property</h2>
          <ul className={topLevelUlClassName}>
            <li>
              The Services and all content and materials included on the Services, including, but not limited to, text,
              graphics, logos, images, and software, are the property of the {termText} or its licensors and are
              protected by copyright, trademark, and other intellectual property laws.
            </li>
            <li>
              We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use our
              Services for your personal, non-commercial use.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>6. User Content</h2>
          <ul className={topLevelUlClassName}>
            <li>
              By submitting, posting, or displaying Content on or through our Services, you grant us a worldwide,
              non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create
              derivative works from, distribute, and display such Content.
            </li>
            <li>
              You represent and warrant that you have all rights, power, and authority necessary to grant the rights
              granted herein to any Content that you submit.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>7. Data Protection and Privacy</h2>
          <ul className={topLevelUlClassName}>
            <li>
              Our collection and use of personal information in connection with your access to and use of the Services
              is described in our Privacy Policy, which is incorporated into these Terms by reference.
            </li>
            <li>
              We comply with all applicable data protection laws and implement appropriate technical and organizational
              measures to ensure a level of security appropriate to the risk, including:
              <ul className={secondLevelUlClassName}>
                <li>
                  Measures to ensure the ongoing confidentiality, integrity, and availability of processing systems and
                  services;
                </li>
                <li>Regular testing, assessment, and evaluation of the effectiveness of security measures.</li>
              </ul>
            </li>
            <li>
              For data protection-related concerns, you can reach out to us at&nbsp;
              <EmailLink email={dataProtectionEmail} />.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>8. Cookies and Tracking Technologies</h2>
          <ul className={topLevelUlClassName}>
            <li>
              We use cookies and similar tracking technologies to track the activity on our Services and hold certain
              information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
              However, if you do not accept cookies, you may not be able to use some portions of our Services.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>9. Third-Party Links</h2>
          <ul className={topLevelUlClassName}>
            <li>
              Our Services may contain links to third-party websites or services that are not owned or controlled by the
              &nbsp;{termText}. We have no control over, and assume no responsibility for, the content, privacy
              policies, or practices of any third-party websites or services.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>10. Limitation of Liability</h2>
          <ul className={topLevelUlClassName}>
            <li>
              To the maximum extent permitted by applicable law, the {termText} shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
              incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting
              from:
              <ul className={secondLevelUlClassName}>
                <li>Your access to or use of or inability to access or use the Services;</li>
                <li>Any conduct or content of any third party on the Services;</li>
                <li>Any content obtained from the Services; or</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>11. Indemnification</h2>
          <ul className={topLevelUlClassName}>
            <li>
              You agree to defend, indemnify, and hold harmless the {termText} and its officers, directors, employees,
              and agents, from and against any claims, liabilities, damages, losses, and expenses, including, without
              limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access
              to or use of the Services or your violation of these Terms.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>12. Termination</h2>
          <ul className={topLevelUlClassName}>
            <li>
              We may terminate or suspend your access to all or part of our Services, with or without notice, for any
              conduct that we, in our sole discretion, believe is in violation of these Terms or is harmful to other
              users of our Services, the {termText}, or third parties, or for any other reason.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>13. International Use</h2>
          <ul className={topLevelUlClassName}>
            <li>
              Our Services are controlled, operated, and administered by the {termText} from {countryName}. We make no
              representation that our Services are appropriate or available for use at other locations outside of&nbsp;
              {countryName}. If you access our Services from a location outside {countryName}, you are responsible for
              compliance with all local laws.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>14. Changes to Terms</h2>
          <ul className={topLevelUlClassName}>
            <li>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will
              provide notice of any changes by posting the new Terms on our website. Your continued use of the Services
              after any such changes constitutes your acceptance of the new Terms.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>15. Right to Erasure</h2>
          <ul className={topLevelUlClassName}>
            <li>
              Users in certain jurisdictions have the right to request that we delete their personal data in certain
              circumstances. To make such a request, please contact us at <EmailLink email={privacyEmail} />. We will
              respond to your request within the timeframe required by applicable law.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>16. Data Portability</h2>
          <ul className={topLevelUlClassName}>
            <li>
              In certain jurisdictions, you have the right to receive your personal data in a structured, commonly used,
              and machine-readable format and to transmit that data to another controller without hindrance from us.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>17. Governing Law</h2>
          <ul className={topLevelUlClassName}>
            <li>
              These Terms shall be governed by and construed in accordance with the laws of {countryName}, without
              regard to its conflict of law provisions. Any disputes relating to these Terms shall be subject to the
              exclusive jurisdiction of the courts of {countryName}.
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className={h2ClassName}>18. Contact Information</h2>
          <ul className={topLevelUlClassName}>
            <li>
              If you have any questions about these Terms, please contact us at <EmailLink email={legalEmail} />.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
