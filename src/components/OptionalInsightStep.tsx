
import * as React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface OptionalInsightStepProps {
  formData: {
    biggestChallenge: string;
    feedbackCall: string;
  };
  onChange: (name: string, value: string) => void;
}

export function OptionalInsightStep({ formData, onChange }: OptionalInsightStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="biggestChallenge">What's your biggest challenge with video content creation?</Label>
        <Textarea
          id="biggestChallenge"
          name="biggestChallenge"
          value={formData.biggestChallenge}
          onChange={(e) => onChange('biggestChallenge', e.target.value)}
          className="mt-2"
          placeholder="Optional - helps us understand your needs"
          rows={3}
        />
      </div>

      <div>
        <Label>Would you like to join a short feedback call?</Label>
        <RadioGroup 
          value={formData.feedbackCall} 
          onValueChange={(value) => onChange('feedbackCall', value)}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="maybe" id="maybe" />
            <Label htmlFor="maybe">Maybe later</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
