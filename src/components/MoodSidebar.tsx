import { useState } from "react";
import { Smile, Angry, Frown, Meh, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface MoodOption {
  icon: React.ComponentType<React.ComponentProps<typeof Smile>>;
  label: string;
  color: string;
}

const moodOptions: MoodOption[] = [
  { icon: Smile, label: "Happy", color: "bg-green-100 hover:bg-green-200 text-green-700" },
  { icon: Angry, label: "Angry", color: "bg-red-100 hover:bg-red-200 text-red-700" },
  { icon: Frown, label: "Sad", color: "bg-blue-100 hover:bg-blue-200 text-blue-700" },
  { icon: Meh, label: "Neutral", color: "bg-gray-100 hover:bg-gray-200 text-gray-700" },
  { icon: Heart, label: "Loved", color: "bg-pink-100 hover:bg-pink-200 text-pink-700" },
];

export const MoodSidebar = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    toast(`Thank you for sharing that you're feeling ${mood.toLowerCase()}`, {
      duration: 3000,
    });
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
              onClick={() => handleMoodSelect(mood.label)}
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