
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Star, Check } from "lucide-react";

interface PersonalDetailsStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    role: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PersonalDetailsStep({ formData, onChange }: PersonalDetailsStepProps) {
  return (
    <div className="space-y-6">
      {/* Lifetime Access Benefits */}
      <div className="bg-white/50 rounded-lg p-4">
        <div className="flex items-center justify-center mb-3">
          <Star className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="font-semibold text-lg">Lifetime Access - $299</span>
          <Star className="h-5 w-5 text-yellow-500 ml-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            <span>Unlimited video analysis</span>
          </div>
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            <span>Priority customer support</span>
          </div>
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            <span>All future features included</span>
          </div>
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            <span>Early access to new tools</span>
          </div>
        </div>
      </div>

      {/* Personal Information Form */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Shield className="h-5 w-5 mr-2 text-primary" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={onChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={onChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={onChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="company">Company/Organization</Label>
            <Input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={onChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="role">Professional Role</Label>
            <Input
              id="role"
              name="role"
              type="text"
              value={formData.role}
              onChange={onChange}
              placeholder="e.g., Content Creator, Marketing Manager"
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
