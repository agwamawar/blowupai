
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TermsHeader } from "@/components/terms/TermsHeader";
import { TermsContent } from "@/components/terms/TermsContent";
import { TermsFooter } from "@/components/terms/TermsFooter";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <TermsHeader />

        <Card>
          <CardHeader>
            <CardTitle>BlowUp AI Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <TermsContent />
            <TermsFooter />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
