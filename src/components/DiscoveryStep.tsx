
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lightbulb } from "lucide-react";

interface DiscoveryStepProps {
  formData: {
    howDidYouHear: string;
    goals: string;
  };
  onChange: (name: string, value: string) => void;
}

export function DiscoveryStep({ formData, onChange }: DiscoveryStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold flex items-center justify-center mb-2">
          <span className="mr-2">💡</span>
          Step 2: Discovery & Intent
        </h3>
        <p className="text-muted-foreground">Just a few more details</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="howDidYouHear">How did you hear about us? *</Label>
          <Select value={formData.howDidYouHear} onValueChange={(value) => onChange('howDidYouHear', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="friend">Friend</SelectItem>
              <SelectItem value="newsletter">Newsletter</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="goals">What do you hope to get out of this app? *</Label>
          <Input
            id="goals"
            name="goals"
            type="text"
            value={formData.goals}
            onChange={(e) => onChange('goals', e.target.value)}
            required
            className="mt-1"
            placeholder="Helps tailor onboarding"
          />
        </div>
      </div>
    </div>
  );
}
