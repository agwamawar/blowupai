
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold flex items-center justify-center mb-2">
          <span className="mr-2">🔮</span>
          Step 3: Optional Insight
        </h3>
        <p className="text-muted-foreground">Optional, but helpful for us</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="biggestChallenge">What's your biggest challenge related to video content creation?</Label>
          <Input
            id="biggestChallenge"
            name="biggestChallenge"
            type="text"
            value={formData.biggestChallenge}
            onChange={(e) => onChange('biggestChallenge', e.target.value)}
            className="mt-1"
            placeholder="Optional - helps us understand your needs"
          />
        </div>

        <div>
          <Label>Would you be open to a 10-min feedback call later?</Label>
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
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
        💡 This step can be skipped, but your insights help us build better features for you!
      </div>
    </div>
  );
}
