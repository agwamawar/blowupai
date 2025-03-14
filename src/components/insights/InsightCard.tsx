
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InsightCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}

export function InsightCard({ icon, title, children, className = "" }: InsightCardProps) {
  return (
    <Card className={`bg-white/80 backdrop-blur-md border border-white/20 shadow-md ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-lg flex items-center">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
