
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

  const allFeatures = [
    'Unlimited video analyses',
    'Advanced AI-powered insights',
    'Multi-platform optimization',
    'Detailed analytics dashboard',
    'Priority support',
    'Custom branding',
    'Team collaboration tools',
    'API access',
    'White-label solution',
    'Dedicated account manager'
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
            <div className="relative bg-gray-800 rounded-full p-1 inline-flex">
              <button
                onClick={() => setIsSubscription(false)}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  !isSubscription 
                    ? 'bg-white text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                One-time
              </button>
              <button
                onClick={() => setIsSubscription(true)}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isSubscription 
                    ? 'bg-white text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Conditional Content Based on Toggle */}
        {isSubscription ? (
          /* Subscription Pricing Grid */
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
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* One-Time Offer */
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="text-6xl font-light text-white mb-4">
                $99
              </div>
              <div className="text-gray-400 text-lg mb-8">
                One-time payment • Lifetime access
              </div>
              <p className="text-xl text-gray-300 mb-12">
                Get everything you need to grow your content, forever.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-left">
              {allFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gray-300 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-[#8d4c55] hover:bg-[#8d4c55]/80 text-white rounded-full px-12 py-4 text-lg"
            >
              Get Lifetime Access
            </Button>
          </div>
        )}

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
