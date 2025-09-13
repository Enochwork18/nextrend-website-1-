import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Terms of Service</h1>
          <p>These Terms of Service govern your use of the NexTrend website and services.</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using our services, you agree to be bound by these Terms of Service and our Privacy Policy.
            If you do not agree to these terms, you may not use our services.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            NexTrend is an AI-powered platform that identifies trending niches and topics across social media platforms.
            We provide data, analytics, and tools to help you discover and capitalize on emerging trends.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            To access certain features of our service, you may be required to create an account. You are responsible for
            maintaining the confidentiality of your account information and for all activities that occur under your
            account. You agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h2>4. User Conduct</h2>
          <p>You agree not to use our services for any unlawful or prohibited purpose. You agree not to:</p>
          <ul>
            <li>Violate any applicable laws or regulations.</li>
            <li>Infringe the rights of any third party, including intellectual property rights.</li>
            <li>Interfere with or disrupt the integrity or performance of our services.</li>
            <li>Attempt to gain unauthorized access to our services or related systems.</li>
            <li>Scrape, data mine, or otherwise extract data from our services without our prior written consent.</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            All content and materials available on our services, including but not limited to text, graphics, logos,
            and software, are the property of NexTrend or its licensors and are protected by copyright, trademark, and
            other intellectual property laws.
          </p>

          <h2>6. Subscription and Payment</h2>
          <p>
            Certain features of our service may require a paid subscription. You agree to pay all applicable fees in
            accordance with the subscription plan you select. All fees are non-refundable.
          </p>

          <h2>7. Free Trial</h2>
          <p>
            We may offer a free trial of our services. The duration of the free trial will be specified at the time of
            signup. At the end of the free trial period, your subscription will automatically renew at the then-current
            rate, unless you cancel your subscription before the end of the trial period.
          </p>

          <h2>8. Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" and "as available" without any warranties of any kind, express or
            implied. We do not warrant that our services will be uninterrupted, error-free, or free of harmful
            components.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            In no event shall NexTrend be liable for any indirect, incidental, special, consequential, or punitive
            damages, including but not limited to loss of profits, data, or goodwill, arising out of or in connection
            with your use of our services.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the State of
            [Your State], without regard to its conflict of law provisions.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. We will notify you of any material
            changes by posting the new terms on our website. Your continued use of our services after any such changes
            constitutes your acceptance of the new terms.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at [Your Email].
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
