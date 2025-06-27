
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "How does the AI analysis work?",
      answer: "Our advanced AI analyzes your video content across multiple dimensions including emotional triggers, engagement patterns, narrative structure, and viral potential. It uses machine learning models trained on millions of successful videos to provide actionable insights."
    },
    {
      question: "What video formats are supported?",
      answer: "We support all major video formats including MP4, MOV, AVI, and WebM. Videos can be up to 2GB in size and 60 minutes in length for most plans."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period, and you won't be charged again."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day free trial so you can test our platform risk-free. For paid plans, we offer a 30-day money-back guarantee if you're not satisfied with the results."
    },
    {
      question: "Is my content secure and private?",
      answer: "Absolutely. We use enterprise-grade security measures to protect your content. Your videos are encrypted during upload and storage, and we never share your content with third parties. You can delete your content at any time."
    },
    {
      question: "What platforms do you optimize for?",
      answer: "We provide optimization recommendations for all major social media platforms including TikTok, Instagram, YouTube, Facebook, Twitter, and LinkedIn. Each platform has specific recommendations tailored to their algorithms."
    },
    {
      question: "How accurate are the viral predictions?",
      answer: "Our AI model has been trained on millions of viral videos and achieves high accuracy rates. While no prediction is 100% guaranteed, our insights have helped creators increase their engagement rates by an average of 300%."
    },
    {
      question: "Can I use this for my team?",
      answer: "Yes! Our Premium and Enterprise plans include multi-user access and team collaboration tools. You can invite team members, share analyses, and work together on content optimization."
    }
  ];

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about our platform
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-white/10 rounded-lg bg-transparent"
            >
              <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-gray-300 hover:no-underline">
                <span className="text-lg font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-300 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Still have questions?
          </p>
          <a
            href="#"
            className="text-[#8d4c55] hover:text-[#8d4c55]/80 transition-colors font-medium"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
}
