import type { Metadata } from "next";
import { SITE_CONFIG, METADATA_DEFAULT } from "@/constants/metadata";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for NetworkNode - Read our terms and conditions for using our platform.",
  ...METADATA_DEFAULT,
  openGraph: {
    ...METADATA_DEFAULT.openGraph,
    title: "Terms of Service | NetworkNode",
    description: "Terms of Service for NetworkNode - Read our terms and conditions for using our platform.",
    url: `${SITE_CONFIG.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Agreement to Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using NetworkNode, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
              If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Use License</h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily access and use NetworkNode for personal, non-commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the platform</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or mirror the materials on any other server</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">User Accounts</h2>
            <p className="text-muted-foreground mb-4">
              To access certain features of the platform, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">User Conduct</h2>
            <p className="text-muted-foreground mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Post false, misleading, or defamatory content</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Impersonate any person or entity</li>
              <li>Upload viruses or malicious code</li>
              <li>Spam or send unsolicited communications</li>
              <li>Interfere with or disrupt the platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Content</h2>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Your Content</h3>
            <p className="text-muted-foreground mb-4">
              You retain ownership of any content you post on NetworkNode. By posting content, you grant us a worldwide, 
              non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content for the purpose of operating and promoting the platform.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-foreground">Our Content</h3>
            <p className="text-muted-foreground mb-4">
              All content on NetworkNode, including but not limited to text, graphics, logos, and software, is the property of NetworkNode 
              or its content suppliers and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Prohibited Uses</h2>
            <p className="text-muted-foreground mb-4">You may not use our platform:</p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground">
              <li>In any way that violates any applicable law or regulation</li>
              <li>To transmit any advertising or promotional material without our consent</li>
              <li>To impersonate or attempt to impersonate the company or employees</li>
              <li>In any way that infringes upon the rights of others</li>
              <li>To engage in any other conduct that restricts or inhibits anyone&apos;s use of the platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Termination</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to terminate or suspend your account and access to the platform immediately, without prior notice, 
              for any reason, including but not limited to a breach of these Terms of Service. Upon termination, your right to use the platform will cease immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Disclaimer</h2>
            <p className="text-muted-foreground mb-4">
              The materials on NetworkNode are provided on an &apos;as is&apos; basis. NetworkNode makes no warranties, expressed or implied, 
              and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, 
              fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Limitations</h2>
            <p className="text-muted-foreground mb-4">
              In no event shall NetworkNode or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
              or due to business interruption) arising out of the use or inability to use the materials on NetworkNode, even if NetworkNode or an authorized 
              representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Governing Law</h2>
            <p className="text-muted-foreground mb-4">
              These terms and conditions are governed by and construed in accordance with applicable laws. Any disputes relating to these terms 
              shall be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Changes to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the new 
              Terms of Service on this page and updating the &quot;Last updated&quot; date. Your continued use of the platform after any such changes 
              constitutes your acceptance of the new Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms of Service, please contact us through our platform or email us at{" "}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-primary hover:underline">
                {SITE_CONFIG.supportEmail}
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

