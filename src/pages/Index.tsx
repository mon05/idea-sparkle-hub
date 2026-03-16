import Layout from "@/components/layout/Layout";
import CategoryCard from "@/components/calculator/CategoryCard";
import { calculatorCategories } from "@/data/calculators";
import { Wine, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useFavorites } from "@/hooks/useFavorites";
import CalculatorCard from "@/components/calculator/CalculatorCard";
import { Calculator } from "@/types/calculator";

const Index = () => {
  const { t, language } = useLanguage();
  const { favorites } = useFavorites();

  // Get all favorite calculators
  const favoriteCalculators: Calculator[] = [];
  calculatorCategories.forEach((cat) => {
    cat.calculators.forEach((calc) => {
      if (favorites.includes(calc.id)) {
        favoriteCalculators.push(calc);
      }
    });
  });

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center py-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-wine shadow-glow mb-4">
            <Wine className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
            {t.heroTitle}
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t.heroDescription}
          </p>
        </section>

        {/* Favorites Section */}
        {favoriteCalculators.length > 0 && (
          <section className="animate-fade-in">
            <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
              <Star className="h-5 w-5 fill-secondary text-secondary" />
              {language === 'ka' ? 'ფავორიტები' : 'Favorites'}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteCalculators.map((calc, index) => (
                <CalculatorCard key={calc.id} calculator={calc} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Categories Grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculatorCategories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </section>

        {/* Quick Tips */}
        <section className="animate-fade-in opacity-0 stagger-6">
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-5">
            <h2 className="font-display text-lg font-semibold mb-2">{t.quickTips}</h2>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>• {t.tip1}</li>
              <li>• {t.tip2}</li>
              <li>• {t.tip3}</li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
