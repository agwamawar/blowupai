
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Shield, CreditCard, Users, Scale, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export function HelpCenterPolicies() {
  const policies = [
    {
      title: "Terms of Service",
      description: "Our terms and conditions for using BlowUp AI",
      icon: FileText,
      link: "/terms"
    },
    {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your data",
      icon: Shield,
      link: "/privacy"
    },
    {
      title: "Refund Policy",
      description: "Information about refunds and cancellations",
      icon: CreditCard,
      link: "#"
    },
    {
      title: "Community Guidelines",
      description: "Rules and guidelines for our community forum",
      icon: Users,
      link: "#"
    },
    {
      title: "Copyright Policy",
      description: "DMCA and intellectual property information",
      icon: Scale,
      link: "#"
    },
    {
      title: "Cookie Policy",
      description: "How we use cookies and tracking technologies",
      icon: Globe,
      link: "#"
    }
  ];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
          Policies & Legal Information
        </h2>
        <p className="text-gray-400 text-lg">
          Important policies and legal documents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy, index) => (
          <Link key={index} to={policy.link}>
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer group h-full">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#8d4c55]/20 p-3 rounded-lg group-hover:bg-[#8d4c55]/30 transition-colors">
                    <policy.icon className="h-6 w-6 text-[#8d4c55]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-200">
                      {policy.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {policy.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
