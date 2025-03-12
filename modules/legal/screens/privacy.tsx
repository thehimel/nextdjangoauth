import React from "react";

import { companyInfo } from "@/modules/global/config/company";
import { formatFullDate } from "@/modules/global/utils";
import EmailLink from "@/modules/legal/components/email-link";

const PrivacyPolicy = () => {
  const companyName: string = companyInfo.name;
  const privacyEmail: string = companyInfo.contact.privacyEmail;

  const h2ClassName = "text-2xl text-center font-bold mb-4";
  const topLevelUlClassName = "list-disc pl-4 space-y-2";
  const secondLevelUlClassName = "list-disc pl-4 space-y-1 pt-1";
  const privacyPolicyUpdateDate: Date = new Date("2025-03-13");

  return (
    <div className="max-w-4xl mx-auto pt-12 px-4 sm:px-6 lg:px-8 text-justify">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-lg text-gray-500">Last Updated: {formatFullDate(privacyPolicyUpdateDate)}</p>
      </div>

      <div className="prose prose-lg prose-indigo mx-auto">
        <section className="mb-10">
          <h2 className={h2ClassName}>1. Introduction</h2>
          <ul className={topLevelUlClassName}>
            <li>
              {companyName} (&#34;we&#34;, &#34;us&#34;, or &#34;our&#34;) is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
              services.
            </li>
            <li>By using our services, you consent to the data practices described in this Privacy Policy.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>2. Information We Collect</h2>
          <ul className={topLevelUlClassName}>
            <li>
              <strong>Personal Information:</strong>
              <ul className={secondLevelUlClassName}>
                <li>Name and contact information</li>
                <li>Login credentials</li>
                <li>Payment information</li>
                <li>Communication preferences</li>
              </ul>
            </li>
            <li>
              <strong>Usage Data:</strong>
              <ul className={secondLevelUlClassName}>
                <li>IP address and device information</li>
                <li>Browser type and settings</li>
                <li>Usage patterns and interactions</li>
                <li>Performance data and error reports</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>3. How We Use Your Information</h2>
          <ul className={topLevelUlClassName}>
            <li>To provide and maintain our services</li>
            <li>To process your transactions</li>
            <li>To send administrative information</li>
            <li>To improve our services</li>
            <li>To protect against fraud and unauthorized access</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>4. Data Storage and Security</h2>
          <ul className={topLevelUlClassName}>
            <li>
              We implement appropriate technical and organizational measures to protect your personal data against
              unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </li>
            <li>Your data is stored in secure cloud facilities maintained by us and our service providers.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>5. Cookies and Tracking Technologies</h2>
          <ul className={topLevelUlClassName}>
            <li>
              We use cookies and similar tracking technologies to:
              <ul className={secondLevelUlClassName}>
                <li>Remember your preferences</li>
                <li>Analyze how you use our services</li>
                <li>Personalize your experience</li>
                <li>Facilitate secure sign-in</li>
              </ul>
            </li>
            <li>You can control cookies through your browser settings, but this may affect service functionality.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>6. Third-Party Services</h2>
          <ul className={topLevelUlClassName}>
            <li>
              We may use third-party service providers to:
              <ul className={secondLevelUlClassName}>
                <li>Process payments</li>
                <li>Analyze service usage</li>
                <li>Send communications</li>
                <li>Host content</li>
              </ul>
            </li>
            <li>
              These providers have access to your information only to perform these tasks and are obligated to protect
              it.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>7. Data Retention</h2>
          <ul className={topLevelUlClassName}>
            <li>
              We retain your personal data only for as long as necessary to:
              <ul className={secondLevelUlClassName}>
                <li>Provide our services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Enforce our agreements</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>8. Your Rights</h2>
          <ul className={topLevelUlClassName}>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
            <li>
              To exercise these rights, we encourage you to reach out to us. You can contact us at&nbsp;
              <EmailLink email={privacyEmail} />
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>9. Children&apos;s Privacy</h2>
          <ul className={topLevelUlClassName}>
            <li>
              Our services are strictly for users who are 18 years of age or older. If you are under 18 years of
              &nbsp;age, you are not permitted to use our services.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>10. International Data Transfers</h2>
          <ul className={topLevelUlClassName}>
            <li>
              Your information may be transferred to and processed in countries other than your country of residence.
              These countries may have different data protection laws.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>11. Changes to This Policy</h2>
          <ul className={topLevelUlClassName}>
            <li>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>12. Legal Basis for Processing</h2>
          <ul className={topLevelUlClassName}>
            <li>
              We process your personal data based on:
              <ul className={secondLevelUlClassName}>
                <li>Your consent</li>
                <li>Contract performance</li>
                <li>Legal obligations</li>
                <li>Legitimate business interests</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>13. Changes to This Privacy Policy</h2>
          <ul className={topLevelUlClassName}>
            <li>
              We may update this Privacy Policy from time to time to reflect changes in law, regulation, our data
              practices, or our business operations. Any changes will become effective when we post the revised Privacy
              Policy on our Services. Your continued use of our Services following these changes means that you accept
              the revised Privacy Policy. We will notify you of any material changes to this Privacy Policy through our
              Services or other communication channels where required by applicable law.
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className={h2ClassName}>14. Contact Us</h2>
          <ul className={topLevelUlClassName}>
            <li>
              If you have any questions about this Privacy Policy, please contact us at&nbsp;
              <EmailLink email={privacyEmail} />
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
