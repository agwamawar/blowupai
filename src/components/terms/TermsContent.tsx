import { TermsSection } from "./TermsSection";

export function TermsContent() {
  return (
    <>
      {/* Section 1 */}
      <TermsSection sectionNumber="1" title="Acceptance of Terms">
        <p className="text-muted-foreground leading-relaxed">
          By accessing and using BlowUp AI ("Service", "Platform", "we", "us", or "our"), 
          you accept and agree to be bound by the terms and provision of this agreement. 
          If you do not agree to abide by the above, please do not use this service.
        </p>
      </TermsSection>

      {/* Section 2 */}
      <TermsSection sectionNumber="2" title="Description of Service">
        <p className="text-muted-foreground leading-relaxed mb-3">
          BlowUp AI is an artificial intelligence-powered platform that analyzes video content 
          to provide insights on viral potential, content optimization, and social media performance. 
          Our service includes but is not limited to:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>Video content analysis and scoring</li>
          <li>Viral potential predictions</li>
          <li>Content optimization recommendations</li>
          <li>Trend analysis and insights</li>
          <li>Platform-specific optimization suggestions</li>
        </ul>
      </TermsSection>

      {/* Section 3 */}
      <TermsSection sectionNumber="3" title="User Accounts and Registration">
        <div className="space-y-3 text-muted-foreground">
          <p>
            To access certain features of our Service, you may be required to create an account. 
            You agree to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your password and account</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
          </ul>
        </div>
      </TermsSection>

      {/* Section 4 */}
      <TermsSection sectionNumber="4" title="Content and Intellectual Property">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">4.1 Your Content</h3>
            <p className="text-muted-foreground leading-relaxed">
              You retain ownership of all content you upload to our platform. By using our Service, 
              you grant us a non-exclusive, worldwide, royalty-free license to use, process, and 
              analyze your content solely for the purpose of providing our services.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">4.2 Our Content</h3>
            <p className="text-muted-foreground leading-relaxed">
              All content, features, and functionality of the Service, including but not limited to 
              text, graphics, logos, icons, images, audio clips, and software, are owned by BlowUp AI 
              and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </div>
        </div>
      </TermsSection>

      {/* Section 5 */}
      <TermsSection sectionNumber="5" title="Acceptable Use Policy">
        <div className="space-y-3">
          <p className="text-muted-foreground">You agree not to use the Service to:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Upload content that is illegal, harmful, threatening, abusive, or offensive</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Upload malicious code, viruses, or harmful software</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use the Service for commercial purposes without authorization</li>
            <li>Reverse engineer, modify, or create derivative works of our Service</li>
          </ul>
        </div>
      </TermsSection>

      {/* Section 6 */}
      <TermsSection sectionNumber="6" title="Privacy and Data Protection">
        <p className="text-muted-foreground leading-relaxed">
          Your privacy is important to us. Our Privacy Policy explains how we collect, use, 
          and protect your information when you use our Service. By using our Service, you 
          agree to the collection and use of information in accordance with our Privacy Policy.
        </p>
      </TermsSection>

      {/* Section 7 */}
      <TermsSection sectionNumber="7" title="Payment and Subscription Terms">
        <div className="space-y-3 text-muted-foreground">
          <p>
            Certain features of our Service may require payment. By purchasing a subscription 
            or making a payment, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Pay all charges associated with your account</li>
            <li>Provide accurate billing information</li>
            <li>Update payment information as needed</li>
            <li>Accept that subscriptions may auto-renew unless cancelled</li>
          </ul>
          <p>
            Refunds may be available in accordance with our refund policy. All payments are 
            processed securely through third-party payment processors.
          </p>
        </div>
      </TermsSection>

      {/* Section 8 - Refund Policy */}
      <TermsSection sectionNumber="8" title="Refund Policy">
        <div className="space-y-3 text-muted-foreground">
          <p>
            We offer a 14-day refund policy for all paid subscriptions and services. 
            To be eligible for a refund, you must meet the following conditions:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Request must be made within 14 days of your initial purchase</li>
            <li>Account must not have been used excessively or in violation of our terms</li>
            <li>Refund requests must be submitted through our official support channels</li>
            <li>Digital services that have been fully consumed may not be eligible for refund</li>
          </ul>
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">8.1 Refund Process</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Contact our support team at support@blowupai.com with your refund request</li>
              <li>Include your account information and reason for the refund request</li>
              <li>Refunds will be processed within 5-10 business days after approval</li>
              <li>Refunds will be issued to the original payment method used for purchase</li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">8.2 Exceptions</h3>
            <p>
              Refunds may be denied for accounts that have violated our terms of service, 
              engaged in fraudulent activity, or excessively used our services beyond normal usage patterns.
            </p>
          </div>
        </div>
      </TermsSection>

      {/* Sections 9-16 */}
      <TermsSection sectionNumber="9" title="Service Availability and Modifications">
        <p className="text-muted-foreground leading-relaxed">
          We strive to maintain high availability of our Service, but we do not guarantee 
          uninterrupted access. We reserve the right to modify, suspend, or discontinue 
          any part of our Service at any time with or without notice. We may also impose 
          limits on certain features or restrict access to parts of the Service.
        </p>
      </TermsSection>

      <TermsSection sectionNumber="10" title="Disclaimers and Limitations of Liability">
        <div className="space-y-3 text-muted-foreground">
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. 
            WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO 
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            IN NO EVENT SHALL BLOWUP AI BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
            CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, 
            DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
          </p>
        </div>
      </TermsSection>

      <TermsSection sectionNumber="11" title="Indemnification">
        <p className="text-muted-foreground leading-relaxed">
          You agree to defend, indemnify, and hold harmless BlowUp AI and its officers, 
          directors, employees, and agents from and against any claims, damages, costs, 
          and expenses (including reasonable attorneys' fees) arising from your use of 
          the Service or violation of these Terms.
        </p>
      </TermsSection>

      <TermsSection sectionNumber="12" title="Termination">
        <p className="text-muted-foreground leading-relaxed">
          We may terminate or suspend your account and access to the Service immediately, 
          without prior notice, for conduct that we believe violates these Terms or is 
          harmful to other users, us, or third parties. You may also terminate your 
          account at any time by contacting us.
        </p>
      </TermsSection>

      <TermsSection sectionNumber="13" title="Governing Law and Dispute Resolution">
        <div className="space-y-3 text-muted-foreground">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of 
            [Your Jurisdiction], without regard to its conflict of law provisions.
          </p>
          <p>
            Any disputes arising from these Terms or your use of the Service shall be 
            resolved through binding arbitration in accordance with the rules of the 
            American Arbitration Association.
          </p>
        </div>
      </TermsSection>

      <TermsSection sectionNumber="14" title="Changes to Terms">
        <p className="text-muted-foreground leading-relaxed">
          We reserve the right to modify these Terms at any time. We will notify users of 
          significant changes by posting the new Terms on our website and updating the 
          "Last updated" date. Your continued use of the Service after changes become 
          effective constitutes acceptance of the new Terms.
        </p>
      </TermsSection>

      <TermsSection sectionNumber="15" title="Contact Information">
        <div className="text-muted-foreground space-y-2">
          <p>If you have any questions about these Terms, please contact us at:</p>
          <div className="bg-muted/30 p-4 rounded-lg">
            <p><strong>Email:</strong> legal@blowupai.com</p>
            <p><strong>Support:</strong> support@blowupai.com</p>
            <p><strong>Address:</strong> 45 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</p>
            <p><strong>Phone:</strong> +234 803 567 8901</p>
          </div>
        </div>
      </TermsSection>

      <TermsSection sectionNumber="16" title="Severability" showSeparator={false}>
        <p className="text-muted-foreground leading-relaxed">
          If any provision of these Terms is held to be invalid or unenforceable, 
          such provision shall be struck and the remaining provisions shall remain 
          in full force and effect.
        </p>
      </TermsSection>
    </>
  );
}
