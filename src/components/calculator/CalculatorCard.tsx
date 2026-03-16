import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronRight, Star } from "lucide-react";
import { Calculator } from "@/types/calculator";
import { useLanguage } from "@/i18n/LanguageContext";
import { useFavorites } from "@/hooks/useFavorites";
import { Button } from "@/components/ui/button";

interface CalculatorCardProps {
  calculator: Calculator;
  index: number;
}

const CalculatorCard = ({ calculator, index }: CalculatorCardProps) => {
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const calcTranslation = t.calculators[calculator.id as keyof typeof t.calculators];
  const fav = isFavorite(calculator.id);

  return (
    <Card 
      variant="interactive" 
      className={`animate-fade-in opacity-0 stagger-${Math.min(index + 1, 6)}`}
    >
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <Link to={calculator.path} className="flex-1 min-w-0">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium font-sans">
              {calcTranslation?.name || calculator.name}
            </CardTitle>
            <CardDescription className="text-xs">
              {calcTranslation?.description || calculator.description}
            </CardDescription>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(calculator.id);
            }}
          >
            <Star className={`h-4 w-4 ${fav ? 'fill-secondary text-secondary' : 'text-muted-foreground'}`} />
          </Button>
          <Link to={calculator.path}>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      </CardHeader>
    </Card>
  );
};

export default CalculatorCard;
