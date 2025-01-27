import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/ChatMessage";
import { Resources } from "@/components/Resources";
import { Send, Heart, Bell, Menu } from "lucide-react";
import { toast } from "sonner";
import { MoodSidebar } from "@/components/MoodSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface Message {
  text: string;
  isBot: boolean;
}

const supportiveResponses = [
  "I hear you, and I want you to know that your feelings are valid. Would you like to tell me more about what's troubling you?",
  "That sounds really challenging. Remember that it's okay to not be okay sometimes. What kind of support would be most helpful right now?",
  "You're showing great strength by reaching out. Let's explore this together - what's on your mind?",
  "I'm here to listen without judgment. Would you like to share more about how you're feeling?",
  "Your feelings matter, and you deserve support. What would help you feel more supported right now?",
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi, I'm here to listen and support you. How are you feeling today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const randomResponse =
      supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
    const botMessage = { text: randomResponse, isBot: true };
    setMessages((prev) => [...prev, botMessage]);

    if (input.length > 50) {
      toast("Remember, I'm here to support you, but please reach out to a mental health professional for personalized help.", {
        duration: 5000,
      });
    }
  };

  const handleNotificationClick = () => {
    toast("No new notifications", { duration: 3000 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F3FF] to-[#EFF6FF] p-4">
      <div className="flex w-full max-w-6xl mx-auto">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
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
          {/* Header with Logo and Notification */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-primary animate-pulse" />
              <span className="text-xl font-semibold text-primary">MindEase</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
              className="hover:bg-primary/10"
            >
              <Bell className="w-6 h-6 text-primary" />
            </Button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-4 transition-all duration-300 hover:shadow-xl">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-primary mb-2">Your Safe Space for Emotional Support</h1>
              <p className="text-sm text-gray-600">
                Share your feelings and receive personalized support, quotes, and music recommendations.
              </p>
            </div>

            <div className="h-[400px] overflow-y-auto mb-4 space-y-4 pr-4">
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
                placeholder="Share how you're feeling..."
                className="flex-1"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 transition-colors">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>

          <Resources />
        </div>
      </div>
    </div>
  );
};

export default Index;