import type { Metadata } from "next";
import { SITE_CONFIG, METADATA_DEFAULT } from "@/constants/metadata";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for NetworkNode - Learn how we collect, use, and protect your personal information.",
  ...METADATA_DEFAULT,
  openGraph: {
    ...METADATA_DEFAULT.openGraph,
    title: "Privacy Policy | NetworkNode",
    description: "Privacy Policy for NetworkNode - Learn how we collect, use, and protect your personal information.",
    url: `${SITE_CONFIG.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to NetworkNode (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring you have a positive experience on our platform. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">Information You Provide</h3>
            <p className="text-muted-foreground mb-4">We collect information that you voluntarily provide when you:</p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground">
              <li>Create an account or profile</li>
              <li>Update your profile information</li>
              <li>Post content, jobs, or startup listings</li>
              <li>Communicate with other users or us</li>
              <li>Participate in surveys or provide feedback</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              This information may include your name, email address, profile picture, bio, work experience, skills, location, 
              and any other information you choose to share.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-foreground">Automatically Collected Information</h3>
            <p className="text-muted-foreground mb-4">When you use our platform, we automatically collect certain information, including:</p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground">
              <li>Device information (device type, operating system, browser type)</li>
              <li>IP address and location data</li>
              <li>Usage data (pages visited, time spent, features used)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Log files and analytics data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground">
              <li>Provide, maintain, and improve our services</li>
              <li>Create and manage your account</li>
              <li>Facilitate connections between users (builders, founders, job seekers)</li>
              <li>Display your profile and content to other users</li>
              <li>Send you notifications, updates, and communications</li>
              <li>Personalize your experience and show relevant content</li>
              <li>Analyze usage patterns and improve our platform</li>
              <li>Detect, prevent, and address technical issues or fraud</li>
              <li>Comply with legal obligations and enforce our terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Information Sharing and Disclosure</h2>
            <p className="text-muted-foreground mb-4">We may share your information in the following circumstances:</p>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">Public Information</h3>
            <p className="text-muted-foreground mb-4">
              Your profile information, posts, and public content are visible to other users of the platform. 
              This includes your name, profile picture, bio, skills, and any content you choose to make public.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-foreground">Service Providers</h3>
            <p className="text-muted-foreground mb-4">
              We may share information with third-party service providers who perform services on our behalf, 
              such as hosting, analytics, payment processing, and email delivery. These providers are contractually 
              obligated to protect your information.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-foreground">Legal Requirements</h3>
            <p className="text-muted-foreground mb-4">
              We may disclose your information if required by law, court order, or government regulation, 
              or if we believe disclosure is necessary to protect our rights, property, or safety, or that of our users.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-foreground">Business Transfers</h3>
            <p className="text-muted-foreground mb-4">
              In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational security measures to protect your information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet 
              or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Your Rights and Choices</h2>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground">
              <li>Access and review your personal information</li>
              <li>Update or correct your information through your account settings</li>
              <li>Delete your account and associated data</li>
              <li>Opt-out of certain communications (you can unsubscribe from marketing emails)</li>
              <li>Request a copy of your data</li>
              <li>Object to or restrict certain processing of your information</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              To exercise these rights, please contact us at{" "}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-primary hover:underline">
                {SITE_CONFIG.supportEmail}
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar tracking technologies to track activity on our platform and hold certain information. 
              Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct 
              your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, 
              you may not be able to use some portions of our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Third-Party Links</h2>
            <p className="text-muted-foreground mb-4">
              Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices 
              of these third parties. We encourage you to read the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Children&apos;s Privacy</h2>
            <p className="text-muted-foreground mb-4">
              Our platform is not intended for users under the age of 18. We do not knowingly collect personal information from 
              children under 18. If you believe we have collected information from a child under 18, please contact us immediately, 
              and we will take steps to delete such information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">International Data Transfers</h2>
            <p className="text-muted-foreground mb-4">
              Your information may be transferred to and maintained on computers located outside of your state, province, country, 
              or other governmental jurisdiction where data protection laws may differ from those in your jurisdiction. By using our 
              platform, you consent to the transfer of your information to our facilities and those third parties with whom we share it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new 
              Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this Privacy Policy 
              periodically to stay informed about how we are protecting your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-muted-foreground mb-4">
              Email:{" "}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-primary hover:underline">
                {SITE_CONFIG.supportEmail}
              </a>
            </p>
            <p className="text-muted-foreground mb-4">
              Website:{" "}
              <a href={SITE_CONFIG.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                {SITE_CONFIG.url}
              </a>
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-border">
            <Link 
              href="/" 
              className="text-primary hover:text-primary/80 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
