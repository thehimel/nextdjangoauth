import React from "react";

import { companyInfo } from "@/modules/global/config/company";
import { formatFullDate } from "@/modules/global/utils";
import { TermType } from "@/modules/legal/constants";
import EmailLink from "@/modules/legal/components/email-link";
import GradientHeader from "@/modules/ui/gradient-header";

const CookiePolicy = () => {
  const companyName: string = companyInfo.name;
  const countryName: string = companyInfo.country;
  const privacyEmail: string = companyInfo.contact.privacyEmail;
  const legalEmail: string = companyInfo.contact.legalEmail;
  const termText = TermType.Organization;
  const cookiePolicyUpdateDate: Date = new Date("2025-03-13");

  const h2ClassName = "text-2xl text-center font-bold mb-4";
  const topLevelUlClassName = "list-disc pl-4 space-y-2";
  const secondLevelUlClassName = "list-disc pl-4 space-y-1 pt-1";

  return (
    <div className="max-w-4xl mx-auto pt-12 px-4 sm:px-6 lg:px-8 text-justify">
      <GradientHeader>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Cookie Policy</h1>
          <p className="mt-4 text-lg text-gray-500">Last Updated: {formatFullDate(cookiePolicyUpdateDate)}</p>
        </div>
      </GradientHeader>

      <div className="prose prose-lg prose-indigo mx-auto">
        <section className="mb-10">
          <h2 className={h2ClassName}>1. Introduction</h2>
          <ul className={topLevelUlClassName}>
            <li>
              This Cookie Policy explains how {companyName} (&#34;{termText}&#34;, &#34;we&#34;, &#34;us&#34;, or
              &#34;our&#34;) uses cookies and similar technologies on our websites, applications, and services
              (collectively, the &#34;Services&#34;).
            </li>
            <li>
              By using our Services, you agree to the use of cookies and similar technologies as described in this
              Cookie Policy. If you do not accept the use of cookies, please disable them as described below or refrain from using our Services.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>2. What Are Cookies</h2>
          <ul className={topLevelUlClassName}>
            <li>
              Cookies are small text files that are placed on your device when you visit a website. Cookies are widely
              used to make websites work more efficiently and provide information to the website owners.
            </li>
            <li>
              Cookies can be &quot;persistent&quot; or &quot;session&quot; cookies. Persistent cookies remain on your
              device when you go offline, while session cookies are deleted as soon as you close your web browser.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>3. Types of Cookies We Use</h2>
          <ul className={topLevelUlClassName}>
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary for the Services to function properly.
              They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies.
            </li>
            <li>
              <strong>Analytical/Performance Cookies:</strong> These cookies allow us to recognize and count the number
              of visitors and see how visitors move around our Services. This helps us improve the way our Services
              work, for example, by ensuring that users find what they are looking for easily.
            </li>
            <li>
              <strong>Functionality Cookies:</strong> These cookies are used to recognize you when you return to our
              Services. This enables us to personalize our content for you and remember your preferences.
            </li>
            <li>
              <strong>Targeting Cookies:</strong> These cookies record your visit to our Services, the pages you have
              visited, and the links you have followed. We use this information to make our Services and the advertising
              displayed on them more relevant to your interests.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>4. Third-Party Cookies</h2>
          <ul className={topLevelUlClassName}>
            <li>
              We may also use cookies from third parties that allow us to track and analyze usage statistics and volume
              information. These cookies allow us to enhance and customize our Services based on user activity and
              improve the performance of our Services.
            </li>
            <li>
              Third-party cookies that may be used on our Services include:
              <ul className={secondLevelUlClassName}>
                <li>Google Analytics (analytics and performance)</li>
                <li>Facebook Pixel (marketing and targeting)</li>
                <li>LinkedIn Insight (marketing and analytics)</li>
                <li>Hotjar (analytics and user behavior)</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>5. Data Collection and Processing</h2>
          <ul className={topLevelUlClassName}>
            <li>
              Through cookies, we may collect the following information:
              <ul className={secondLevelUlClassName}>
                <li>IP address and approximate location</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website</li>
                <li>Pages visited and time spent on each page</li>
                <li>Actions taken on our Services</li>
                <li>Device information (screen size, device type)</li>
              </ul>
            </li>
            <li>
              This information is used to analyze user behavior, improve our Services, personalize content, and optimize
              marketing efforts.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>6. Mandatory Cookie Acceptance</h2>
          <ul className={topLevelUlClassName}>
            <li>
              By using our Services, you agree to the use of all cookies described in this policy. In order to provide
              you with the full functionality of our Services, we require that you accept cookies.
            </li>
            <li>
              If you choose not to accept cookies, you may not be able to use all features of our Services, and we
              recommend that you discontinue use of our Services.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>7. Cookie Management</h2>
          <ul className={topLevelUlClassName}>
            <li>
              Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies,
              or to alert you when cookies are being sent. However, if you disable or refuse cookies, please note that
              some parts of our Services may become inaccessible or not function properly.
            </li>
            <li>
              The procedures for changing your cookie settings vary from browser to browser:
              <ul className={secondLevelUlClassName}>
                <li>Chrome: Settings → Privacy and Security → Cookies and other site data</li>
                <li>Firefox: Options → Privacy & Security → Cookies and Site Data</li>
                <li>Safari: Preferences → Privacy → Cookies and website data</li>
                <li>Edge: Settings → Cookies and site permissions → Cookies</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>8. Pixel Tags/Web Beacons</h2>
          <ul className={topLevelUlClassName}>
            <li>
              In addition to cookies, we may use pixel tags (also known as web beacons or clear GIFs) on our Services.
              These are tiny graphic images that help us analyze user behavior and track conversions. Pixel tags
              generally work in conjunction with cookies.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>9. Data Retention</h2>
          <ul className={topLevelUlClassName}>
            <li>
              Different cookies have different lifespans. Some of our cookies are &quot;session cookies&quot; which are
              deleted when you close your browser. Others are &quot;persistent cookies&quot; which remain on your device
              for a specified period.
            </li>
            <li>
              The information collected via cookies is retained for a period necessary to fulfill the purposes outlined
              in this Cookie Policy, unless a longer retention period is required by law.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>10. Data Security</h2>
          <ul className={topLevelUlClassName}>
            <li>
              We implement appropriate technical and organizational measures to ensure a level of security appropriate
              &nbsp;to the risk, including:
              <ul className={secondLevelUlClassName}>
                <li>Encryption of data where appropriate</li>
                <li>Regular security assessments of our systems</li>
                <li>Access controls to limit data access to authorized personnel</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>11. International Data Transfers</h2>
          <ul className={topLevelUlClassName}>
            <li>
              Information collected through cookies may be transferred to, stored, and processed in {countryName} or any
              other country where we or our service providers maintain facilities. By using our Services, you consent to
              the transfer of information to countries outside your country of residence, which may have different data
              protection rules.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>12. Legal Basis for Processing</h2>
          <ul className={topLevelUlClassName}>
            <li>
              We process cookie data on the following legal grounds:
              <ul className={secondLevelUlClassName}>
                <li>Your consent, as provided by your continued use of our Services</li>
                <li>Our legitimate interests in providing, maintaining, and improving our Services</li>
                <li>Contractual necessity to provide the Services you have requested</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>13. Your Rights</h2>
          <ul className={topLevelUlClassName}>
            <li>
              Depending on your jurisdiction, you may have certain rights regarding your personal data, including:
              <ul className={secondLevelUlClassName}>
                <li>The right to access information about how your data is processed</li>
                <li>The right to request copies of your personal data</li>
                <li>The right to request correction of inaccurate data</li>
                <li>The right to request deletion of your data in certain circumstances</li>
              </ul>
            </li>
            <li>
              To exercise these rights, please contact us at <EmailLink email={privacyEmail} />.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>14. Changes to This Cookie Policy</h2>
          <ul className={topLevelUlClassName}>
            <li>
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our
              business practices. Any changes will become effective when we post the revised Cookie Policy on our
              Services. Your continued use of our Services following these changes means that you accept the revised
              Cookie Policy.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className={h2ClassName}>15. Relation to Privacy Policy</h2>
          <ul className={topLevelUlClassName}>
            <li>
              This Cookie Policy is part of and supplemental to our Privacy Policy. For more information about how we
              handle your personal data, please refer to our Privacy Policy.
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className={h2ClassName}>16. Contact Information</h2>
          <ul className={topLevelUlClassName}>
            <li>
              If you have any questions about this Cookie Policy, please feel free to contact us at&nbsp;
              <EmailLink email={legalEmail} />.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
