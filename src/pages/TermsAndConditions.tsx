
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TermsAndConditions() {
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
            Terms and Conditions
          </h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>BlowUp AI Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Section 1 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using BlowUp AI ("Service", "Platform", "we", "us", or "our"), 
                you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <Separator />

            {/* Section 2 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
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
            </div>

            <Separator />

            {/* Section 3 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">3. User Accounts and Registration</h2>
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
            </div>

            <Separator />

            {/* Section 4 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">4. Content and Intellectual Property</h2>
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
            </div>

            <Separator />

            {/* Section 5 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">5. Acceptable Use Policy</h2>
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
            </div>

            <Separator />

            {/* Section 6 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">6. Privacy and Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, 
                and protect your information when you use our Service. By using our Service, you 
                agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </div>

            <Separator />

            {/* Section 7 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">7. Payment and Subscription Terms</h2>
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
            </div>

            <Separator />

            {/* Section 8 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">8. Service Availability and Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to maintain high availability of our Service, but we do not guarantee 
                uninterrupted access. We reserve the right to modify, suspend, or discontinue 
                any part of our Service at any time with or without notice. We may also impose 
                limits on certain features or restrict access to parts of the Service.
              </p>
            </div>

            <Separator />

            {/* Section 9 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">9. Disclaimers and Limitations of Liability</h2>
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
            </div>

            <Separator />

            {/* Section 10 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">10. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to defend, indemnify, and hold harmless BlowUp AI and its officers, 
                directors, employees, and agents from and against any claims, damages, costs, 
                and expenses (including reasonable attorneys' fees) arising from your use of 
                the Service or violation of these Terms.
              </p>
            </div>

            <Separator />

            {/* Section 11 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">11. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your account and access to the Service immediately, 
                without prior notice, for conduct that we believe violates these Terms or is 
                harmful to other users, us, or third parties. You may also terminate your 
                account at any time by contacting us.
              </p>
            </div>

            <Separator />

            {/* Section 12 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">12. Governing Law and Dispute Resolution</h2>
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
            </div>

            <Separator />

            {/* Section 13 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">13. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of 
                significant changes by posting the new Terms on our website and updating the 
                "Last updated" date. Your continued use of the Service after changes become 
                effective constitutes acceptance of the new Terms.
              </p>
            </div>

            <Separator />

            {/* Section 14 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">14. Contact Information</h2>
              <div className="text-muted-foreground space-y-2">
                <p>If you have any questions about these Terms, please contact us at:</p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p><strong>Email:</strong> legal@blowupai.com</p>
                  <p><strong>Address:</strong> [Your Business Address]</p>
                  <p><strong>Phone:</strong> [Your Phone Number]</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 15 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">15. Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is held to be invalid or unenforceable, 
                such provision shall be struck and the remaining provisions shall remain 
                in full force and effect.
              </p>
            </div>

            <div className="mt-8 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                By using BlowUp AI, you acknowledge that you have read, understood, and 
                agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
