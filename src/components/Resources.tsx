import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export const Resources = () => {
  const resources = [
    {
      title: "Emergency Help",
      content: "988 Suicide & Crisis Lifeline - Available 24/7",
    },
    {
      title: "Crisis Text Line",
      content: "Text HOME to 741741 to connect with a Crisis Counselor",
    },
    {
      title: "SAMHSA's National Helpline",
      content: "1-800-662-4357 - Treatment referral and information",
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            Helpful Resources <ExternalLink className="w-4 h-4" />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {resources.map((resource) => (
            <div key={resource.title} className="space-y-1">
              <h3 className="font-medium">{resource.title}</h3>
              <p className="text-sm text-muted-foreground">{resource.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};