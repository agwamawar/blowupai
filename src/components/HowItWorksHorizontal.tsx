
import React from 'react';
import { Upload, Cpu, Rocket } from 'lucide-react';

export function HowItWorksHorizontal() {
  const steps = [
    {
      id: 1,
      title: "Upload Your Content",
      icon: Upload,
      description: "Drop your video or describe your content idea. Our platform instantly begins processing and preparing for comprehensive analysis."
    },
    {
      id: 2,
      title: "AI-Powered Analysis",
      icon: Cpu,
      description: "Advanced AI examines your content across multiple dimensions - emotional triggers, engagement patterns, and viral potential scoring."
    },
    {
      id: 3,
      title: "Optimize & Apply",
      icon: Rocket,
      description: "Receive actionable optimization recommendations and platform-specific strategies to maximize your content's reach and impact."
    }
  ];

  return (
    <section className="bg-black text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
            How It Works
          </h3>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="text-center group">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <step.icon className="h-12 w-12 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                </div>

                {/* Title */}
                <h4 className="text-xl font-semibold text-white mb-4 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                  {step.title}
                </h4>
                
                {/* Description */}
                <p className="text-[#EDEDED] text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>

              {/* Vertical Divider - only show between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-0 bottom-0 w-px bg-white/10" 
                     style={{ left: `${((index + 1) * 100) / 3}%` }}>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
