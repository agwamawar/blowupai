
import React from 'react';
import { Upload, Brain, Zap } from 'lucide-react';

export function HowItWorksHorizontal() {
  const steps = [
    {
      id: 1,
      title: "Upload",
      icon: Upload,
      description: "Drop your video or describe your content idea. BlowUp AI instantly begins processing your upload, extracting key elements and preparing for deep analysis.",
      color: "from-[#8d4c55]/20 to-blue-900/20",
      borderColor: "border-[#8d4c55]/30"
    },
    {
      id: 2,
      title: "Analyze",
      icon: Brain,
      description: "Our advanced AI scans your content across multiple dimensions - emotional triggers, trend alignment, audience engagement patterns, and viral potential scoring.",
      color: "from-blue-500/20 to-purple-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      id: 3,
      title: "Optimize",
      icon: Zap,
      description: "Receive detailed optimization recommendations, viral score breakdowns, and platform-specific strategies to maximize your content's reach and engagement.",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30"
    }
  ];

  return (
    <section className="relative bg-black text-white py-20 px-6 md:px-12">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
            How It Works
          </h3>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.id} className="relative group">
                {/* Step Circle */}
                <div className={`relative mx-auto w-16 h-16 rounded-full bg-gradient-to-br ${step.color} ${step.borderColor} border-2 flex items-center justify-center mb-6 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                  <step.icon className="h-7 w-7 text-white" />
                </div>

                {/* Step Content */}
                <div className="text-center">
                  {/* Step Title */}
                  <div className="bg-gray-900/40 border border-gray-800/50 rounded-2xl p-6 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Step {step.id}: {step.title}
                    </h4>
                    
                    {/* Hidden Description - Revealed on Hover */}
                    <div className="opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:max-h-32">
                      <div className="pt-3 border-t border-gray-700 mt-3">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile connector (vertical line) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-0.5 h-8 bg-gradient-to-b from-gray-600 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg mb-6">
            Ready to see your content's viral potential?
          </p>
          <button className="bg-[#8d4c55] hover:bg-[#8d4c55]/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            Start Your Analysis
          </button>
        </div>
      </div>
    </section>
  );
}
