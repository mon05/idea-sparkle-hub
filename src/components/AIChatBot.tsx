import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Wine, Send, Bot, User, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const RATE_LIMIT_KEY = 'wine_tips_rate_limit';
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

const checkRateLimit = (): boolean => {
  const now = Date.now();
  const storedData = localStorage.getItem(RATE_LIMIT_KEY);
  let requests: number[] = [];
  
  if (storedData) {
    try {
      requests = JSON.parse(storedData);
    } catch {
      requests = [];
    }
  }
  
  // Filter to only requests within the window
  requests = requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS);
  
  if (requests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  // Add current request and save
  requests.push(now);
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(requests));
  return true;
};

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const placeholderText = language === 'ka' 
    ? "დასვით კითხვა მეღვინეობაზე..."
    : "Ask a winemaking question...";

  const titleText = language === 'ka' ? "ღვინის ექსპერტი" : "Wine Expert";
  const welcomeText = language === 'ka'
    ? "გამარჯობა! მე ვარ თქვენი მეღვინეობის ექსპერტი. დამისვით ნებისმიერი კითხვა ღვინის დამზადების შესახებ."
    : "Hello! I'm your winemaking expert. Ask me anything about wine production, chemistry, or best practices.";

  const rateLimitText = language === 'ka'
    ? "გთხოვთ დაელოდოთ სანამ მეტ კითხვას დასვამთ"
    : "Please wait before sending more messages";

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Client-side rate limiting
    if (!checkRateLimit()) {
      toast({
        title: language === 'ka' ? "შეცდომა" : "Rate Limited",
        description: rateLimitText,
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('wine-tips', {
        body: { message: userMessage.content },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.reply || "I couldn't generate a response.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('AI chat error:', error);
      toast({
        title: language === 'ka' ? "შეცდომა" : "Error",
        description: error.message || (language === 'ka' ? "ვერ მოხერხდა პასუხის მიღება" : "Failed to get response"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-wine bg-primary hover:bg-primary/90 z-50 animate-[pulse_3s_ease-in-out_infinite] hover:animate-none ring-4 ring-primary/20 hover:ring-primary/40 transition-all duration-300"
        >
          <Wine className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-4 border-b bg-primary/5">
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            {titleText}
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground p-4">
                <Bot className="h-12 w-12 mx-auto mb-3 text-primary/50" />
                <p className="text-sm">{welcomeText}</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholderText}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              variant="wine"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIChatBot;
