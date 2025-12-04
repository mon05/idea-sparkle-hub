import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { CalculatorCategory } from "@/types/calculator";

interface CategoryCardProps {
  category: CalculatorCategory;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  return (
    <Link to={`/category/${category.id}`}>
      <Card 
        variant="interactive" 
        className={`animate-fade-in opacity-0 stagger-${Math.min(index + 1, 6)} group`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <CardTitle className="text-lg">{category.name}</CardTitle>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>{category.description}</CardDescription>
          <p className="text-xs text-muted-foreground mt-2">
            {category.calculators.length} calculator{category.calculators.length !== 1 ? 's' : ''}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
