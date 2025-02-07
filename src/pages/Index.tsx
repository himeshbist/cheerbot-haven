
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/ChatMessage";
import { Resources } from "@/components/Resources";
import { Send, Heart, Bell, Menu, HelpCircle, Sun, Moon, Music, Coffee, Smile, Frown } from "lucide-react";
import { toast } from "sonner";
import { MoodSidebar } from "@/components/MoodSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Message {
  text: string;
  isBot: boolean;
  mood?: string;
}

const supportiveResponses = {
  happy: [
    "Your positive energy is contagious! What's making you feel so good today?",
    "I love seeing you in high spirits! Want to share what's bringing you joy?",
    "That's wonderful! Let's celebrate these positive moments together.",
  ],
  neutral: [
    "How are you feeling right now? I'm here to listen and chat.",
    "Sometimes taking a moment to reflect can help. What's on your mind?",
    "I'm here to support you, whether you want to talk or just have someone listen.",
  ],
  sad: [
    "I hear you, and I want you to know that your feelings are valid. Would you like to tell me more?",
    "I'm here for you during tough times. What kind of support would help right now?",
    "Remember, it's okay to not be okay. Would you like to explore what's troubling you?",
  ]
};

const moodEmojis = {
  happy: "😊",
  neutral: "😐",
  sad: "😔"
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm your personal emotional support companion. How are you feeling today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [currentMood, setCurrentMood] = useState<string>("neutral");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 18) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeMood = (text: string): string => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('happy') || lowerText.includes('great') || lowerText.includes('good') || lowerText.includes('amazing')) {
      return 'happy';
    } else if (lowerText.includes('sad') || lowerText.includes('bad') || lowerText.includes('tired') || lowerText.includes('upset')) {
      return 'sad';
    }
    return 'neutral';
  };

  const getMoodResponse = (mood: string) => {
    const responses = supportiveResponses[mood as keyof typeof supportiveResponses] || supportiveResponses.neutral;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const detectedMood = analyzeMood(input);
    setCurrentMood(detectedMood);

    const userMessage = { text: input, isBot: false, mood: detectedMood };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = getMoodResponse(detectedMood);
    const botMessage = { text: response, isBot: true };
    setMessages((prev) => [...prev, botMessage]);

    if (detectedMood === 'sad') {
      toast("Remember, you're not alone. Would you like to explore some self-care activities?", {
        duration: 5000,
        icon: "💗",
      });
    }
  };

  const handleNotificationClick = () => {
    toast("No new notifications", { 
      duration: 3000,
      icon: "🔔"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E5DEFF] via-[#FFDEE2] to-[#FEF7CD] p-4">
      <div className="flex w-full max-w-6xl mx-auto">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/20 backdrop-blur-sm">
              <Menu className="h-6 w-6 text-primary" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-transparent border-none">
            <MoodSidebar />
          </SheetContent>
        </Sheet>

        <div className="hidden md:block">
          <MoodSidebar />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 bg-white/30 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-primary animate-float" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MindEase
              </span>
              <span className="text-sm bg-white/40 backdrop-blur-sm px-3 py-1 rounded-full text-primary font-medium">
                Good {timeOfDay}! {moodEmojis[currentMood as keyof typeof moodEmojis]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-white/20 backdrop-blur-sm">
                    <HelpCircle className="w-6 h-6 text-primary" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <Resources />
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNotificationClick}
                className="hover:bg-white/20 backdrop-blur-sm"
              >
                <Bell className="w-6 h-6 text-primary" />
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/auth'}
                className="bg-white/50 hover:bg-white/70 backdrop-blur-sm text-primary font-medium"
              >
                Sign In
              </Button>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-4 transition-all duration-300 hover:shadow-xl border border-white/50">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2 animate-pulse-gentle">
                Your Personal Space for Emotional Support
              </h1>
              <p className="text-sm text-gray-600 max-w-lg mx-auto">
                Share your thoughts and feelings - I'm here to listen and support you through every mood.
              </p>
              <div className="flex justify-center gap-4 mt-6">
                {Object.entries(moodEmojis).map(([mood, emoji]) => (
                  <Button
                    key={mood}
                    variant={currentMood === mood ? "default" : "ghost"}
                    onClick={() => setCurrentMood(mood)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 ${
                      currentMood === mood
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "hover:bg-white/50 backdrop-blur-sm"
                    }`}
                  >
                    <span className="mr-2 text-lg">{emoji}</span>
                    <span className="font-medium">
                      {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="h-[400px] overflow-y-auto mb-4 space-y-4 pr-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message.text}
                  isBot={message.isBot}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tell me how you're feeling..."
                className="flex-1 bg-white/50 backdrop-blur-sm border-white/50 focus:border-primary/50 placeholder:text-gray-500"
              />
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <Button variant="ghost" className="bg-white/30 hover:bg-white/50 backdrop-blur-sm text-primary hover:text-primary/80 font-medium px-6">
              <Music className="w-4 h-4 mr-2" />
              Calming Playlist
            </Button>
            <Button variant="ghost" className="bg-white/30 hover:bg-white/50 backdrop-blur-sm text-primary hover:text-primary/80 font-medium px-6">
              <Coffee className="w-4 h-4 mr-2" />
              Self-Care Tips
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
