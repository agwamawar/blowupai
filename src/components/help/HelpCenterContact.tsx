
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, Clock } from "lucide-react";

export function HelpCenterContact() {
  const contactOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      availability: "24/7 Available",
      action: "Start Chat",
      primary: true
    },
    {
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      icon: Mail,
      availability: "Response within 24 hours",
      action: "Send Email"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our technical experts",
      icon: Phone,
      availability: "Mon-Fri, 9AM-6PM EST",
      action: "Call Now"
    }
  ];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
          Contact Our Support Team
        </h2>
        <p className="text-gray-400 text-lg">
          Choose the best way to reach us
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactOptions.map((option, index) => (
          <Card key={index} className={`${option.primary ? 'bg-[#8d4c55]/10 border-[#8d4c55]/30' : 'bg-white/5 border-white/10'} hover:bg-white/10 transition-all duration-200`}>
            <CardContent className="p-6 text-center">
              <div className={`inline-flex p-4 rounded-full mb-4 ${option.primary ? 'bg-[#8d4c55]/20' : 'bg-white/10'}`}>
                <option.icon className={`h-8 w-8 ${option.primary ? 'text-[#8d4c55]' : 'text-white'}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {option.title}
              </h3>
              <p className="text-gray-400 mb-4">
                {option.description}
              </p>
              <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
                <Clock className="h-4 w-4 mr-2" />
                {option.availability}
              </div>
              <Button 
                className={`w-full ${option.primary ? 'bg-[#8d4c55] hover:bg-[#8d4c55]/80' : 'bg-transparent border border-white/30 text-white hover:bg-white/10'}`}
              >
                {option.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
