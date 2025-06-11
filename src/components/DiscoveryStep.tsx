
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
      <div>
        <Label htmlFor="howDidYouHear">How did you hear about us? *</Label>
        <Select value={formData.howDidYouHear} onValueChange={(value) => onChange('howDidYouHear', value)}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="social-media">Social Media</SelectItem>
            <SelectItem value="google-search">Google Search</SelectItem>
            <SelectItem value="friend">Friend</SelectItem>
            <SelectItem value="online-community">Online Community</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="goals">What do you hope to gain from this app? *</Label>
        <Textarea
          id="goals"
          name="goals"
          value={formData.goals}
          onChange={(e) => onChange('goals', e.target.value)}
          required
          className="mt-2"
          placeholder="Tell us what you're hoping to achieve..."
          rows={4}
        />
      </div>
    </div>
  );
}
