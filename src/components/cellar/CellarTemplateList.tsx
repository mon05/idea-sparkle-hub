import { Button } from "@/components/ui/button";
import { cellarTemplates, CellarTemplate } from "@/data/cellarTemplates";
import { useLanguage } from "@/i18n/LanguageContext";
import { RepeatIcon } from "lucide-react";

interface CellarTemplateListProps {
  onSelect: (template: CellarTemplate) => void;
}

const CellarTemplateList = ({ onSelect }: CellarTemplateListProps) => {
  const { language } = useLanguage();

  const headerText = language === 'ka' ? 'შაბლონები' : 'Quick Templates';
  const daysLabel = (d: number) => {
    if (d === 1) return language === 'ka' ? 'ყოველდღე' : 'Daily';
    if (d === 7) return language === 'ka' ? 'ყოველ კვირა' : 'Weekly';
    if (d === 14) return language === 'ka' ? 'ყოველ 2 კვირა' : 'Every 2 weeks';
    if (d === 30) return language === 'ka' ? 'ყოველთვიური' : 'Monthly';
    return language === 'ka' ? `ყოველ ${d} დღე` : `Every ${d} days`;
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{headerText}</p>
      <div className="grid grid-cols-2 gap-2">
        {cellarTemplates.map((tpl) => (
          <Button
            key={tpl.id}
            variant="outline"
            size="sm"
            className="h-auto py-2 px-3 flex flex-col items-start gap-0.5 text-left"
            onClick={() => onSelect(tpl)}
          >
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <span>{tpl.icon}</span>
              {language === 'ka' ? tpl.titleKa : tpl.titleEn}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <RepeatIcon className="h-3 w-3" />
              {daysLabel(tpl.intervalDays)}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CellarTemplateList;
