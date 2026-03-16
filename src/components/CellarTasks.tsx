import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Plus, Trash2, Check, Clock, RepeatIcon } from "lucide-react";
import { useCellarTasks, CellarTask } from "@/hooks/useCellarTasks";
import { useLanguage } from "@/i18n/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import CellarTemplateList from "@/components/cellar/CellarTemplateList";
import { CellarTemplate } from "@/data/cellarTemplates";

const CellarTasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [recurringDays, setRecurringDays] = useState<number | "">("");
  const { tasks, addTask, toggleComplete, removeTask, markNotified } = useCellarTasks();
  const { language } = useLanguage();
  const { toast } = useToast();

  const t = (en: string, ka: string) => language === 'ka' ? ka : en;

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
              title: t("Task Due!", "ამოცანის ვადა!"),
              description: task.title,
            });
          }
        }
      });
    };
    checkDueTasks();
    const interval = setInterval(checkDueTasks, 60000);
    return () => clearInterval(interval);
  }, [tasks, markNotified, toast, language]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const resetForm = () => {
    setTitle("");
    setNote("");
    setDueDate("");
    setRecurringDays("");
    setShowForm(false);
    setShowTemplates(false);
  };

  const handleAdd = () => {
    if (!title.trim() || !dueDate) return;
    addTask({
      title: title.trim(),
      note: note.trim(),
      dueDate,
      recurringDays: recurringDays ? Number(recurringDays) : undefined,
    });
    resetForm();
    requestNotificationPermission();
  };

  const handleTemplateSelect = (tpl: CellarTemplate) => {
    const now = new Date();
    now.setDate(now.getDate() + tpl.intervalDays);
    const localISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString().slice(0, 16);

    setTitle(language === 'ka' ? tpl.titleKa : tpl.titleEn);
    setNote(language === 'ka' ? tpl.noteKa : tpl.noteEn);
    setDueDate(localISO);
    setRecurringDays(tpl.intervalDays);
    setShowTemplates(false);
    setShowForm(true);
  };

  const handleComplete = (task: CellarTask) => {
    toggleComplete(task.id);
    // If recurring and being completed, create next occurrence
    if (!task.completed && task.recurringDays) {
      const nextDue = new Date();
      nextDue.setDate(nextDue.getDate() + task.recurringDays);
      const localISO = new Date(nextDue.getTime() - nextDue.getTimezoneOffset() * 60000)
        .toISOString().slice(0, 16);
      addTask({
        title: task.title,
        note: task.note,
        dueDate: localISO,
        recurringDays: task.recurringDays,
      });
      toast({
        title: t("Next task created", "შემდეგი ამოცანა შეიქმნა"),
        description: `${task.title} — ${formatDate(localISO)}`,
      });
    }
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
              {t("Cellar Tasks", "მარნის ამოცანები")}
            </SheetTitle>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" onClick={() => { setShowTemplates(!showTemplates); setShowForm(false); }}>
                <RepeatIcon className="h-4 w-4 mr-1" />
                {t("Templates", "შაბლონები")}
              </Button>
              <Button variant="outline" size="sm" onClick={() => { setShowForm(!showForm); setShowTemplates(false); }}>
                <Plus className="h-4 w-4 mr-1" />
                {t("New", "ახალი")}
              </Button>
            </div>
          </div>
        </SheetHeader>

        {showTemplates && (
          <div className="p-4 border-b border-border bg-muted/30">
            <CellarTemplateList onSelect={handleTemplateSelect} />
          </div>
        )}

        {showForm && (
          <div className="p-4 border-b border-border space-y-3 bg-muted/30">
            <div>
              <Label className="text-sm">{t("Title", "სათაური")}</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("e.g. Rack wine", "მაგ. ღვინის გადაღება")} />
            </div>
            <div>
              <Label className="text-sm">{t("Note", "შენიშვნა")}</Label>
              <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder={t("Optional note", "არასავალდებულო შენიშვნა")} />
            </div>
            <div>
              <Label className="text-sm">{t("Due Date", "ვადა")}</Label>
              <Input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div>
              <Label className="text-sm">{t("Repeat every (days)", "განმეორება (დღეებში)")}</Label>
              <Input
                type="number"
                min={0}
                value={recurringDays}
                onChange={(e) => setRecurringDays(e.target.value ? Number(e.target.value) : "")}
                placeholder={t("0 = no repeat", "0 = არ განმეორდება")}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="wine" size="sm" onClick={handleAdd} disabled={!title.trim() || !dueDate}>
                {t("Save", "შენახვა")}
              </Button>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                {t("Cancel", "გაუქმება")}
              </Button>
            </div>
          </div>
        )}

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">{t("No tasks yet", "ამოცანები არ არის")}</p>
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
                      <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 mt-0.5" onClick={() => handleComplete(task)}>
                        <Check className={`h-4 w-4 ${task.completed ? 'text-primary' : 'text-muted-foreground'}`} />
                      </Button>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm truncate ${task.completed ? 'line-through' : ''}`}>
                          {task.title}
                        </p>
                        {task.note && <p className="text-xs text-muted-foreground mt-0.5">{task.note}</p>}
                        <div className="flex items-center gap-2 mt-1">
                          <p className={`text-xs ${isOverdue(task) ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                            {formatDate(task.dueDate)}
                            {isOverdue(task) && t(' — overdue', ' — ვადაგადასული')}
                          </p>
                          {task.recurringDays && (
                            <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                              <RepeatIcon className="h-3 w-3" />
                              {task.recurringDays}d
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeTask(task.id)}>
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
