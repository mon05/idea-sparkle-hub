import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { History, Trash2, Clock } from "lucide-react";
import { useCalculationHistory, CalculationEntry } from "@/hooks/useCalculationHistory";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CalculationHistory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { history, removeEntry, clearHistory } = useCalculationHistory();
  const { language } = useLanguage();

  const titleText = language === 'ka' ? "გამოთვლების ისტორია" : "Calculation History";
  const emptyText = language === 'ka' ? "ისტორია ცარიელია" : "No calculations yet";
  const clearText = language === 'ka' ? "ყველას წაშლა" : "Clear All";
  const confirmClearText = language === 'ka' 
    ? "ნამდვილად გსურთ მთელი ისტორიის წაშლა?"
    : "Are you sure you want to clear all history?";

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(language === 'ka' ? 'ka-GE' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatInputs = (inputs: Record<string, number>) => {
    return Object.entries(inputs)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <History className="h-5 w-5" />
          {history.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {history.length > 9 ? '9+' : history.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              {titleText}
            </SheetTitle>
            {history.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-1" />
                    {clearText}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{clearText}</AlertDialogTitle>
                    <AlertDialogDescription>{confirmClearText}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{language === 'ka' ? 'გაუქმება' : 'Cancel'}</AlertDialogCancel>
                    <AlertDialogAction onClick={clearHistory}>
                      {language === 'ka' ? 'წაშლა' : 'Delete'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {history.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">{emptyText}</p>
              </div>
            ) : (
              history.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-muted/50 rounded-lg p-3 border border-border/50 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{entry.calculatorName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(entry.timestamp)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeEntry(entry.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="mt-2 pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      {formatInputs(entry.inputs)}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {entry.result.toFixed(2)} {entry.unit}
                    </p>
                    {entry.details && (
                      <p className="text-xs text-muted-foreground mt-1">{entry.details}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CalculationHistory;
