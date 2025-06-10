
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";

interface PersonalDetailsStepProps {
  formData: {
    fullName: string;
    email: string;
    country: string;
  };
  onChange: (name: string, value: string) => void;
}

export function PersonalDetailsStep({ formData, onChange }: PersonalDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold flex items-center justify-center mb-2">
          <span className="text-green-500 mr-2">✅</span>
          Step 1: Personal Info
        </h3>
        <p className="text-muted-foreground">Let's get to know you</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            required
            className="mt-1"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            required
            className="mt-1"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <Label htmlFor="country">Country / Location *</Label>
          <Select value={formData.country} onValueChange={(value) => onChange('country', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        We respect your privacy
      </div>
    </div>
  );
}
