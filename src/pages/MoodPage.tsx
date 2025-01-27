import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Music2, Quote, BookOpen, Coffee } from "lucide-react";

interface MoodPageState {
  mood: {
    label: string;
    quote: string;
    music: string;
    color: string;
  };
}

const MoodPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mood } = location.state as MoodPageState;

  const activities = [
    {
      title: "Listen to Music",
      description: mood.music,
      icon: Music2,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Daily Quote",
      description: mood.quote,
      icon: Quote,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Read Articles",
      description: "Explore articles about managing your emotions",
      icon: BookOpen,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Self-Care Tips",
      description: "Discover ways to take care of yourself",
      icon: Coffee,
      color: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F3FF] to-[#EFF6FF] p-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Your {mood.label} Space
          </h1>
          <p className="text-gray-600">
            We've curated some activities to match your mood
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.title}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-block p-3 rounded-full ${activity.color} mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoodPage;