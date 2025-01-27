import { useState } from "react";
import { Smile, Angry, Frown, Meh, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface MoodOption {
  icon: React.ComponentType<React.ComponentProps<typeof Smile>>;
  label: string;
  color: string;
  quote: string;
  music: string;
}

const moodOptions: MoodOption[] = [
  { 
    icon: Smile, 
    label: "Happy", 
    color: "bg-green-100 hover:bg-green-200 text-green-700",
    quote: "Happiness is not something ready-made. It comes from your own actions.",
    music: "Don't Stop Believin' - Journey"
  },
  { 
    icon: Angry, 
    label: "Angry", 
    color: "bg-red-100 hover:bg-red-200 text-red-700",
    quote: "For every minute you remain angry, you give up sixty seconds of peace of mind.",
    music: "Eye of the Tiger - Survivor"
  },
  { 
    icon: Frown, 
    label: "Sad", 
    color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    quote: "Even the darkest night will end and the sun will rise.",
    music: "Bridge Over Troubled Water - Simon & Garfunkel"
  },
  { 
    icon: Meh, 
    label: "Neutral", 
    color: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    quote: "Life is a balance of holding on and letting go.",
    music: "What a Wonderful World - Louis Armstrong"
  },
  { 
    icon: Heart, 
    label: "Loved", 
    color: "bg-pink-100 hover:bg-pink-200 text-pink-700",
    quote: "The best thing to hold onto in life is each other.",
    music: "All You Need Is Love - The Beatles"
  },
];

export const MoodSidebar = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMoodSelect = (mood: MoodOption) => {
    setSelectedMood(mood.label);
    
    // Show toast notification
    toast("Mood Selected", {
      description: "Taking you to your personalized space...",
      duration: 2000,
    });

    // Navigate to the mood page with the selected mood data
    navigate("/mood", { state: { mood } });
  };

  return (
    <div className="w-64 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg h-[calc(100vh-2rem)] mr-4 animate-fade-in">
      <h2 className="text-lg font-semibold text-primary mb-4">How are you feeling?</h2>
      <div className="space-y-2">
        {moodOptions.map((mood) => {
          const Icon = mood.icon;
          return (
            <button
              key={mood.label}
              onClick={() => handleMoodSelect(mood)}
              className={cn(
                "w-full p-3 rounded-lg flex items-center gap-3 transition-all duration-200",
                mood.color,
                selectedMood === mood.label && "ring-2 ring-primary"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{mood.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
        <p className="text-sm text-primary">
          Sharing your mood helps us provide better support. Your emotional well-being matters to us.
        </p>
      </div>
    </div>
  );
};