
import { Card, CardContent } from "@/components/ui/card";
import { User, CreditCard, Wrench, Headphones, Shield, Book, AlertCircle, FileText } from "lucide-react";

export function HelpCenterCategories() {
  const categories = [
    {
      title: "Account & Login Help",
      description: "Manage your account, reset passwords, and login issues",
      icon: User,
      articles: 12
    },
    {
      title: "Billing & Payments",
      description: "Subscription management, billing questions, and refunds",
      icon: CreditCard,
      articles: 8
    },
    {
      title: "Troubleshooting",
      description: "Fix common issues and technical problems",
      icon: Wrench,
      articles: 15
    },
    {
      title: "Technical Support",
      description: "Advanced technical assistance and bug reports",
      icon: Headphones,
      articles: 10
    },
    {
      title: "Privacy & Security",
      description: "Data protection, privacy settings, and security",
      icon: Shield,
      articles: 6
    },
    {
      title: "Product Guides",
      description: "How-to guides and feature explanations",
      icon: Book,
      articles: 20
    }
  ];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
          Browse by Category
        </h2>
        <p className="text-gray-400 text-lg">
          Find help organized by topic
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#8d4c55]/20 p-3 rounded-lg group-hover:bg-[#8d4c55]/30 transition-colors">
                  <category.icon className="h-6 w-6 text-[#8d4c55]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gray-200">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {category.description}
                  </p>
                  <span className="text-xs text-gray-500">
                    {category.articles} articles
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
