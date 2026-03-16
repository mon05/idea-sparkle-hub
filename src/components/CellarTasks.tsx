import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Plus, Trash2, Check, Clock } from "lucide-react";
import { useCellarTasks, CellarTask } from "@/hooks/useCellarTasks";
import { useLanguage } from "@/i18n/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const CellarTasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { tasks, addTask, toggleComplete, removeTask, markNotified } = useCellarTasks();
  const { language } = useLanguage();
  const { toast } = useToast();

  const titleText = language === 'ka' ? "მარნის ამოცანები" : "Cellar Tasks";
  const addText = language === 'ka' ? "ახალი ამოცანა" : "New Task";
  const emptyText = language === 'ka' ? "ამოცანები არ არის" : "No tasks yet";
  const taskTitleLabel = language === 'ka' ? "სათაური" : "Title";
  const noteLabel = language === 'ka' ? "შენიშვნა" : "Note";
  const dueDateLabel = language === 'ka' ? "ვადა" : "Due Date";
  const saveText = language === 'ka' ? "შენახვა" : "Save";
  const cancelText = language === 'ka' ? "გაუქმება" : "Cancel";

  // Check for due tasks and send notifications
  useEffect(() => {
    const checkDueTasks = () => {
      const now = new Date();
      tasks.forEach((task) => {
        if (task.completed || task.notified) return;
        const due = new Date(task.dueDate);
        if (due <= now) {
          markNotified(task.id);
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('WineCalc — Cellar Task Due', {
              body: task.title,
              icon: '/app.png',
            });
          } else {
            toast({
              title: language === 'ka' ? "ამოცანის ვადა!" : "Task Due!",
              description: task.title,
            });
          }
        }
      });
    };

    checkDueTasks();
    const interval = setInterval(checkDueTasks, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [tasks, markNotified, toast, language]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const handleAdd = () => {
    if (!title.trim() || !dueDate) return;
    addTask({ title: title.trim(), note: note.trim(), dueDate });
    setTitle("");
    setNote("");
    setDueDate("");
    setShowForm(false);
    requestNotificationPermission();
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === 'ka' ? 'ka-GE' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOverdue = (task: CellarTask) => {
    return !task.completed && new Date(task.dueDate) < new Date();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
              {pendingCount > 9 ? '9+' : pendingCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              {titleText}
            </SheetTitle>
            <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-1" />
              {addText}
            </Button>
          </div>
        </SheetHeader>

        {showForm && (
          <div className="p-4 border-b border-border space-y-3 bg-muted/30">
            <div>
              <Label className="text-sm">{taskTitleLabel}</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={language === 'ka' ? "მაგ. ღვინის გადაღება" : "e.g. Rack wine"}
              />
            </div>
            <div>
              <Label className="text-sm">{noteLabel}</Label>
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={language === 'ka' ? "არასავალდებულო შენიშვნა" : "Optional note"}
              />
            </div>
            <div>
              <Label className="text-sm">{dueDateLabel}</Label>
              <Input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="wine" size="sm" onClick={handleAdd} disabled={!title.trim() || !dueDate}>
                {saveText}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                {cancelText}
              </Button>
            </div>
          </div>
        )}

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">{emptyText}</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`rounded-lg p-3 border group ${
                    task.completed
                      ? 'bg-muted/30 border-border/30 opacity-60'
                      : isOverdue(task)
                      ? 'bg-destructive/10 border-destructive/30'
                      : 'bg-muted/50 border-border/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0 mt-0.5"
                        onClick={() => toggleComplete(task.id)}
                      >
                        <Check className={`h-4 w-4 ${task.completed ? 'text-primary' : 'text-muted-foreground'}`} />
                      </Button>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm truncate ${task.completed ? 'line-through' : ''}`}>
                          {task.title}
                        </p>
                        {task.note && (
                          <p className="text-xs text-muted-foreground mt-0.5">{task.note}</p>
                        )}
                        <p className={`text-xs mt-1 ${isOverdue(task) ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                          {formatDate(task.dueDate)}
                          {isOverdue(task) && (language === 'ka' ? ' — ვადაგადასული' : ' — overdue')}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeTask(task.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
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

export default CellarTasks;
