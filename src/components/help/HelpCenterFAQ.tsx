
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function HelpCenterFAQ() {
  const faqs = [
    {
      question: "How do I get started with BlowUp AI?",
      answer: "Simply upload your video content through our upload section, and our AI will analyze it across multiple dimensions including emotional triggers, engagement patterns, and viral potential. You'll receive detailed insights and actionable recommendations within minutes."
    },
    {
      question: "What video formats do you support?",
      answer: "We support all major video formats including MP4, MOV, AVI, and WebM. Videos can be up to 2GB in size and 60 minutes in length for most plans."
    },
    {
      question: "How accurate are your viral predictions?",
      answer: "Our AI model has been trained on millions of viral videos and achieves high accuracy rates. While no prediction is 100% guaranteed, our insights have helped creators increase their engagement rates by an average of 300%."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time through your account settings. Your access will continue until the end of your current billing period, and you won't be charged again."
    },
    {
      question: "Is my content secure and private?",
      answer: "Absolutely. We use enterprise-grade security measures to protect your content. Your videos are encrypted during upload and storage, and we never share your content with third parties. You can delete your content at any time."
    },
    {
      question: "Do you offer team collaboration features?",
      answer: "Yes! Our Premium and Enterprise plans include multi-user access and team collaboration tools. You can invite team members, share analyses, and work together on content optimization."
    }
  ];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-lg">
          Quick answers to common questions
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border border-white/10 rounded-lg bg-white/5"
            >
              <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-gray-300 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                <span className="text-lg font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-300 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
