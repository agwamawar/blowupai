
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Clock, ExternalLink } from "lucide-react";

export function HelpCenterStatus() {
  const systemStatus = [
    {
      service: "Video Analysis Engine",
      status: "operational",
      uptime: "99.9%"
    },
    {
      service: "File Upload System",
      status: "operational",
      uptime: "99.8%"
    },
    {
      service: "Dashboard & Analytics",
      status: "operational",
      uptime: "99.9%"
    },
    {
      service: "API Services",
      status: "maintenance",
      uptime: "99.7%"
    }
  ];

  const recentIncidents = [
    {
      title: "Scheduled Maintenance - API Services",
      description: "Planned maintenance to improve performance",
      status: "ongoing",
      time: "2 hours ago"
    },
    {
      title: "Upload Processing Delays",
      description: "Resolved - All systems operating normally",
      status: "resolved",
      time: "1 day ago"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'maintenance':
        return <Clock className="h-5 w-5 text-yellow-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-400" />;
    }
  };

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
          System Status
        </h2>
        <p className="text-gray-400 text-lg">
          Real-time status of our services
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Status */}
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">
                Service Status
              </h3>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400 text-sm">All Systems Operational</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {systemStatus.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(service.status)}
                    <span className="text-white">{service.service}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Uptime</div>
                    <div className="text-white font-medium">{service.uptime}</div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6 bg-transparent border border-white/30 text-white hover:bg-white/10">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Detailed Status
            </Button>
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Recent Updates
            </h3>
            
            <div className="space-y-4">
              {recentIncidents.map((incident, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium">{incident.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      incident.status === 'ongoing' ? 'bg-yellow-500/20 text-yellow-400' :
                      incident.status === 'resolved' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {incident.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">
                    {incident.description}
                  </p>
                  <span className="text-xs text-gray-500">{incident.time}</span>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-6 border-white/30 text-white hover:bg-white/10">
              View Incident History
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
