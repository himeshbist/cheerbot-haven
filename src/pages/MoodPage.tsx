import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Music2, Quote, Film, Tv2, Coffee, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

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

  const getRecommendations = (moodLabel: string) => {
    switch (moodLabel.toLowerCase()) {
      case 'happy':
        return {
          movies: ["The Secret Life of Walter Mitty", "La La Land", "The Intouchables"],
          series: ["Ted Lasso", "The Good Place", "Modern Family"]
        };
      case 'angry':
        return {
          movies: ["Rocky", "The Karate Kid", "Million Dollar Baby"],
          series: ["Cobra Kai", "Breaking Bad", "The Boys"]
        };
      case 'sad':
        return {
          movies: ["The Pursuit of Happyness", "Good Will Hunting", "Inside Out"],
          series: ["This Is Us", "After Life", "The Crown"]
        };
      case 'neutral':
        return {
          movies: ["The Grand Budapest Hotel", "Big Fish", "The Life Aquatic"],
          series: ["Parks and Recreation", "Community", "Brooklyn Nine-Nine"]
        };
      case 'loved':
        return {
          movies: ["About Time", "Eternal Sunshine of the Spotless Mind", "500 Days of Summer"],
          series: ["Normal People", "Modern Love", "Bridgerton"]
        };
      default:
        return {
          movies: ["The Secret Life of Walter Mitty", "La La Land", "The Intouchables"],
          series: ["Ted Lasso", "The Good Place", "Modern Family"]
        };
    }
  };

  const recommendations = getRecommendations(mood.label);

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
      title: "Movies for You",
      description: recommendations.movies.join(", "),
      icon: Film,
      color: "bg-pink-100 text-pink-700",
    },
    {
      title: "Web Series",
      description: recommendations.series.join(", "),
      icon: Tv2,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Read Articles",
      description: "Explore articles about managing your emotions",
      icon: BookOpen,
      color: "bg-yellow-100 text-yellow-700",
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
      <div className="max-w-6xl mx-auto">
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
            We've curated some activities and entertainment to match your mood
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={activity.title}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`inline-block p-3 rounded-full ${activity.color} mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoodPage;