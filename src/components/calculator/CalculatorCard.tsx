import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Calculator } from "@/types/calculator";
import { useLanguage } from "@/i18n/LanguageContext";

interface CalculatorCardProps {
  calculator: Calculator;
  index: number;
}

const CalculatorCard = ({ calculator, index }: CalculatorCardProps) => {
  const { t } = useLanguage();
  const calcTranslation = t.calculators[calculator.id as keyof typeof t.calculators];
  
  return (
    <Link to={calculator.path}>
      <Card 
        variant="interactive" 
        className={`animate-fade-in opacity-0 stagger-${Math.min(index + 1, 6)}`}
      >
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium font-sans">
              {calcTranslation?.name || calculator.name}
            </CardTitle>
            <CardDescription className="text-xs">
              {calcTranslation?.description || calculator.description}
            </CardDescription>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
      </Card>
    </Link>
  );
};

export default CalculatorCard;
