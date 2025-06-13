
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>BlowUp AI Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Section 1 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                BlowUp AI ("we," "us," or "our") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard 
                your information when you use our AI-powered video analysis platform ("Service"). 
                Please read this privacy policy carefully. If you do not agree with the terms 
                of this privacy policy, please do not access the Service.
              </p>
            </div>

            <Separator />

            {/* Section 2 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">2.1 Personal Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We may collect personally identifiable information that you voluntarily 
                    provide to us when you:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Register for an account</li>
                    <li>Use our services</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Contact us for support</li>
                    <li>Participate in surveys or promotions</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    This information may include: name, email address, phone number, 
                    billing address, payment information, and other contact details.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">2.2 Usage Data</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We automatically collect certain information when you access and use our Service, including:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>IP address and device identifiers</li>
                    <li>Browser type and version</li>
                    <li>Operating system information</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Clickstream data and user interactions</li>
                    <li>Referral sources</li>
                    <li>Device and connection information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">2.3 Video Content and Analysis Data</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When you upload videos for analysis, we collect and process:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Video files and their metadata</li>
                    <li>Audio content within videos</li>
                    <li>Visual elements and content analysis results</li>
                    <li>Generated insights and recommendations</li>
                    <li>User preferences and settings</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">2.4 Cookies and Tracking Technologies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies, web beacons, and similar tracking technologies to enhance 
                    your experience and collect information about how you use our Service.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 3 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Provide, operate, and maintain our Service</li>
                <li>Process video analysis and generate insights</li>
                <li>Improve and personalize user experience</li>
                <li>Process payments and manage subscriptions</li>
                <li>Send administrative and promotional communications</li>
                <li>Respond to customer support requests</li>
                <li>Detect and prevent fraud and abuse</li>
                <li>Comply with legal obligations</li>
                <li>Develop new features and services</li>
                <li>Conduct research and analytics</li>
              </ul>
            </div>

            <Separator />

            {/* Section 4 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">4. How We Share Your Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">4.1 Service Providers</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We may share your information with third-party service providers who assist 
                    us in operating our Service, including cloud hosting, payment processing, 
                    analytics, and customer support services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">4.2 Business Transfers</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    In the event of a merger, acquisition, or sale of assets, your information 
                    may be transferred as part of the business transaction.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">4.3 Legal Requirements</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We may disclose your information if required by law, court order, or 
                    government request, or to protect our rights and safety.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">4.4 Consent</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We may share your information with your explicit consent or at your direction.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 5 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We implement appropriate technical and organizational security measures to protect 
                your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection</li>
                <li>Incident response and breach notification procedures</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                However, no method of transmission over the internet or electronic storage 
                is 100% secure. While we strive to protect your information, we cannot 
                guarantee absolute security.
              </p>
            </div>

            <Separator />

            {/* Section 6 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">6. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to provide our 
                services and fulfill the purposes outlined in this Privacy Policy. Specific 
                retention periods include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-3">
                <li>Account information: Until account deletion or 3 years after last activity</li>
                <li>Video content: 30 days after analysis completion (unless saved by user)</li>
                <li>Usage data: Up to 2 years for analytics purposes</li>
                <li>Payment information: As required by law and payment processors</li>
                <li>Support communications: Up to 5 years</li>
              </ul>
            </div>

            <Separator />

            {/* Section 7 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">7. Your Privacy Rights</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Restriction:</strong> Request limitation of processing</li>
                  <li><strong>Objection:</strong> Object to certain types of processing</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent for processing based on consent</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>
            </div>

            <Separator />

            {/* Section 8 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">8. Cookies and Tracking</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  We use various types of cookies and tracking technologies:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how you use our Service</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  You can control cookies through your browser settings, but this may affect 
                  some functionality of our Service.
                </p>
              </div>
            </div>

            <Separator />

            {/* Section 9 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">9. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service may contain links to third-party websites or integrate with 
                third-party services. We are not responsible for the privacy practices of 
                these third parties. We encourage you to review their privacy policies 
                before providing any personal information.
              </p>
            </div>

            <Separator />

            {/* Section 10 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">10. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than 
                your country of residence. We ensure appropriate safeguards are in place to 
                protect your information in accordance with applicable data protection laws, 
                including standard contractual clauses and adequacy decisions.
              </p>
            </div>

            <Separator />

            {/* Section 11 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">11. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service is not intended for children under the age of 13 (or 16 in the EU). 
                We do not knowingly collect personal information from children under these ages. 
                If we become aware that we have collected personal information from a child 
                under the applicable age, we will take steps to delete such information.
              </p>
            </div>

            <Separator />

            {/* Section 12 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">12. California Privacy Rights (CCPA)</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  If you are a California resident, you have additional rights under the 
                  California Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Right to know what personal information is collected</li>
                  <li>Right to delete personal information</li>
                  <li>Right to opt-out of the sale of personal information</li>
                  <li>Right to non-discrimination for exercising privacy rights</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell personal information to third parties. To exercise your CCPA 
                  rights, please contact us using the information below.
                </p>
              </div>
            </div>

            <Separator />

            {/* Section 13 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">13. European Privacy Rights (GDPR)</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you are located in the European Economic Area (EEA) or UK, you have rights 
                under the General Data Protection Regulation (GDPR). We process your personal 
                information based on lawful bases including consent, contract performance, 
                legitimate interests, and legal compliance. You have the right to lodge a 
                complaint with your local data protection authority.
              </p>
            </div>

            <Separator />

            {/* Section 14 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">14. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our 
                practices or applicable laws. We will notify you of material changes by posting 
                the updated policy on our website and updating the "Last updated" date. Your 
                continued use of our Service after such changes constitutes acceptance of the 
                updated Privacy Policy.
              </p>
            </div>

            <Separator />

            {/* Section 15 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">15. Contact Information</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, 
                  please contact us:
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p><strong>Email:</strong> privacy@blowupai.com</p>
                  <p><strong>Data Protection Officer:</strong> dpo@blowupai.com</p>
                  <p><strong>Address:</strong> [Your Business Address]</p>
                  <p><strong>Phone:</strong> [Your Phone Number]</p>
                </div>
                <p className="text-sm">
                  For EU residents, you can also contact our EU representative at: 
                  eu-rep@blowupai.com
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                By using BlowUp AI, you acknowledge that you have read, understood, and 
                agree to this Privacy Policy.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-card border rounded-lg">
          <p className="text-center text-muted-foreground">
            By using BlowUp AI, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
