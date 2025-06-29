
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, ThumbsUp, TrendingUp } from "lucide-react";

export function HelpCenterCommunity() {
  const communityStats = [
    { label: "Active Members", value: "12,500+", icon: Users },
    { label: "Discussions", value: "3,200+", icon: MessageSquare },
    { label: "Solutions Found", value: "8,900+", icon: ThumbsUp },
    { label: "Success Stories", value: "1,400+", icon: TrendingUp }
  ];

  const popularTopics = [
    "Video Optimization Tips",
    "Platform-Specific Strategies",
    "Content Creation Workflow",
    "Analytics and Metrics",
    "Success Stories"
  ];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
          Community Forum
        </h2>
        <p className="text-gray-400 text-lg">
          Connect with other creators and share solutions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Community Stats */}
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Join Our Community
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex p-3 bg-[#8d4c55]/20 rounded-lg mb-2">
                    <stat.icon className="h-6 w-6 text-[#8d4c55]" />
                  </div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
            <Button className="w-full bg-[#8d4c55] hover:bg-[#8d4c55]/80">
              Join Community
            </Button>
          </CardContent>
        </Card>

        {/* Popular Topics */}
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Popular Topics
            </h3>
            <div className="space-y-3 mb-6">
              {popularTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="text-gray-300">{topic}</span>
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
              Browse All Topics
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
