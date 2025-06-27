
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingSection() {
  const [isSubscription, setIsSubscription] = useState(true);

  const pricingData = {
    subscription: {
      starter: { price: 29, period: '/month' },
      pro: { price: 79, period: '/month' },
      premium: { price: 149, period: '/month' },
      enterprise: { price: 299, period: '/month' }
    },
    oneTime: {
      starter: { price: 299, period: 'one-time' },
      pro: { price: 799, period: 'one-time' },
      premium: { price: 1499, period: 'one-time' },
      enterprise: { price: 2999, period: 'one-time' }
    }
  };

  const currentPricing = isSubscription ? pricingData.subscription : pricingData.oneTime;

  const tiers = [
    {
      name: 'Starter',
      key: 'starter',
      subtitle: 'Ideal for new creators',
      features: [
        '10 video analyses/month',
        'Basic trend insights',
        'Platform optimization',
        'Email support'
      ]
    },
    {
      name: 'Pro',
      key: 'pro',
      subtitle: 'For active content creators',
      features: [
        '30 video analyses/month',
        'Advanced engagement tools',
        'Detailed analytics',
        'Priority support',
        'Custom branding'
      ],
      popular: true
    },
    {
      name: 'Premium',
      key: 'premium',
      subtitle: 'For growing businesses',
      features: [
        '75 video analyses/month',
        'Multi-user access',
        'Team collaboration tools',
        'Custom integrations',
        'White-label solution',
        'Dedicated account manager'
      ]
    },
    {
      name: 'Enterprise',
      key: 'enterprise',
      subtitle: 'For large organizations',
      features: [
        'Unlimited analyses',
        'Custom AI models',
        'API access',
        'Advanced security',
        'On-premise deployment',
        '24/7 phone support'
      ]
    }
  ];

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight">
            Pricing
          </h2>
          
          {/* Toggle Switch */}
          <div className="flex items-center justify-center mb-12">
            <span className={`text-lg mr-4 transition-colors ${!isSubscription ? 'text-white' : 'text-gray-400'}`}>
              One-Time
            </span>
            <button
              onClick={() => setIsSubscription(!isSubscription)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${
                isSubscription ? 'bg-white' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-black transition-transform ${
                  isSubscription ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg ml-4 transition-colors ${isSubscription ? 'text-white' : 'text-gray-400'}`}>
              Subscription
            </span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier) => (
            <div key={tier.key} className="relative text-center">
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-[#8d4c55] text-white text-sm px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Tier Content */}
              <div className="pt-8">
                <h3 className="text-2xl font-semibold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{tier.subtitle}</p>
                
                {/* Price */}
                <div className="mb-8">
                  <div className="text-4xl font-light text-white mb-1">
                    ${currentPricing[tier.key as keyof typeof currentPricing].price}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {currentPricing[tier.key as keyof typeof currentPricing].period}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 text-left">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-gray-300 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className={`w-full rounded-full py-3 transition-all duration-300 ${
                    tier.popular
                      ? 'bg-[#8d4c55] hover:bg-[#8d4c55]/80 text-white'
                      : 'bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50'
                  }`}
                >
                  {isSubscription ? 'Start Free Trial' : 'Get Started'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
