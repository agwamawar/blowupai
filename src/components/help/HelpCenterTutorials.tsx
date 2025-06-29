
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Book, Download, Clock } from "lucide-react";

export function HelpCenterTutorials() {
  const tutorials = [
    {
      title: "Getting Started with BlowUp AI",
      description: "Complete walkthrough from signup to your first analysis",
      type: "video",
      duration: "12 min",
      level: "Beginner"
    },
    {
      title: "Advanced Analytics Dashboard",
      description: "Deep dive into metrics and how to interpret results",
      type: "video",
      duration: "18 min",
      level: "Advanced"
    },
    {
      title: "Platform Optimization Guide",
      description: "Tailoring content for different social media platforms",
      type: "guide",
      duration: "8 min read",
      level: "Intermediate"
    },
    {
      title: "Team Collaboration Setup",
      description: "Setting up multi-user access and workflow",
      type: "guide",
      duration: "5 min read",
      level: "Beginner"
    }
  ];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
          Tutorials & Guides
        </h2>
        <p className="text-gray-400 text-lg">
          Step-by-step tutorials and comprehensive guides
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tutorials.map((tutorial, index) => (
          <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200 group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#8d4c55]/20 p-3 rounded-lg group-hover:bg-[#8d4c55]/30 transition-colors">
                  {tutorial.type === 'video' ? (
                    <Play className="h-6 w-6 text-[#8d4c55]" />
                  ) : (
                    <Book className="h-6 w-6 text-[#8d4c55]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-gray-200">
                      {tutorial.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      tutorial.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      tutorial.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {tutorial.level}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    {tutorial.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {tutorial.duration}
                    </div>
                    <Button size="sm" className="bg-transparent hover:bg-[#8d4c55]/20 text-[#8d4c55] border border-[#8d4c55]/30">
                      {tutorial.type === 'video' ? 'Watch' : 'Read'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button className="bg-transparent border border-white/30 text-white hover:bg-white/10 px-8">
          View All Tutorials
        </Button>
      </div>
    </section>
  );
}
