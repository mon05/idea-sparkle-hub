import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import CategoryCard from "@/components/calculator/CategoryCard";
import CalculatorCard from "@/components/calculator/CalculatorCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { calculatorCategories } from "@/data/calculators";
import { Search, Star, Wine } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useFavorites } from "@/hooks/useFavorites";

const SEARCH_STORAGE_KEY = "winecalc_calculator_search";
const GROUPS_STORAGE_KEY = "winecalc_expanded_calculator_groups";

const savedSearch = () => {
  try {
    return sessionStorage.getItem(SEARCH_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
};

const savedGroups = (): string[] => {
  try {
    const value: unknown = JSON.parse(sessionStorage.getItem(GROUPS_STORAGE_KEY) ?? "[]");
    return Array.isArray(value)
      ? value.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
};

const Index = () => {
  const { t, language } = useLanguage();
  const { favorites } = useFavorites();
  const [search, setSearch] = useState(savedSearch);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(savedGroups);

  useEffect(() => {
    try {
      sessionStorage.setItem(SEARCH_STORAGE_KEY, search);
    } catch {
      // Browsing still works when storage is unavailable.
    }
  }, [search]);

  useEffect(() => {
    try {
      sessionStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(expandedGroups));
    } catch {
      // Browsing still works when storage is unavailable.
    }
  }, [expandedGroups]);

  const allCalculators = calculatorCategories.flatMap((category) =>
    category.calculators.map((calculator) => ({ calculator, category }))
  );

  const favoriteCalculators = allCalculators
    .filter(({ calculator }) => favorites.includes(calculator.id))
    .map(({ calculator }) => calculator);

  const normalizedSearch = search.trim().toLocaleLowerCase();
  const matches = normalizedSearch
    ? allCalculators.filter(({ calculator, category }) => {
        const translatedCalculator = t.calculators[calculator.id as keyof typeof t.calculators];
        const translatedCategory = t.categories[category.id as keyof typeof t.categories];
        return [
          calculator.name,
          calculator.description,
          translatedCalculator?.name,
          translatedCalculator?.description,
          category.name,
          translatedCategory?.name,
        ].some((value) => value?.toLocaleLowerCase().includes(normalizedSearch));
      })
    : [];

  return (
    <Layout>
      <div className="space-y-6 sm:space-y-8">
        <section role="search" className="sticky top-16 z-30 -mx-2 rounded-lg bg-background/95 px-2 py-2 backdrop-blur sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0">
          <label htmlFor="calculator-search" className="sr-only">
            {language === "ka" ? "კალკულატორების ძიება" : "Search calculators"}
          </label>
          <div className="relative">
            <Search aria-hidden="true" className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="calculator-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={language === "ka" ? "მოძებნე კალკულატორი..." : "Search calculators..."}
              className="h-12 pl-10 text-base"
            />
          </div>
        </section>

        {!normalizedSearch && (
          <section className="text-center py-2 sm:py-6 animate-fade-in">
            <div className="hidden sm:inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-wine shadow-glow mb-4">
              <Wine className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-display font-bold mb-2 sm:mb-3">
              {t.heroTitle}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
              {t.heroDescription}
            </p>
          </section>
        )}

        {normalizedSearch ? (
          <section className="space-y-3" aria-live="polite">
            <h2 className="text-sm font-medium text-muted-foreground">
              {language === "ka" ? "ძიების შედეგები" : "Search results"} ({matches.length})
            </h2>
            {matches.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {matches.map(({ calculator }, index) => (
                  <CalculatorCard key={calculator.id} calculator={calculator} index={index} />
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-border/50 p-5 text-sm text-muted-foreground">
                {language === "ka" ? "კალკულატორი ვერ მოიძებნა. სცადე სხვა სიტყვა." : "No calculators found. Try another term."}
              </p>
            )}
          </section>
        ) : (
          <>
            {favoriteCalculators.length > 0 && (
              <section className="animate-fade-in">
                <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                  {language === "ka" ? "ფავორიტები" : "Favorites"}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {favoriteCalculators.map((calc, index) => (
                    <CalculatorCard key={calc.id} calculator={calc} index={index} />
                  ))}
                </div>
              </section>
            )}

            <section aria-label={language === "ka" ? "კალკულატორების კატეგორიები" : "Calculator categories"}>
              <div className="sm:hidden">
                <Accordion
                  type="multiple"
                  value={expandedGroups}
                  onValueChange={setExpandedGroups}
                  className="space-y-2"
                >
                  {calculatorCategories.map((category) => {
                    const translation = t.categories[category.id as keyof typeof t.categories];
                    return (
                      <AccordionItem
                        key={category.id}
                        value={category.id}
                        className="rounded-xl border border-border/60 bg-card px-4"
                      >
                        <AccordionTrigger className="gap-3 py-4 text-left hover:no-underline">
                          <span aria-hidden="true" className="text-xl">{category.icon}</span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-medium">{translation?.name || category.name}</span>
                            <span className="mt-1 block text-xs text-muted-foreground">
                              {category.calculators.length} {t.calculatorsCount}
                            </span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pb-1">
                            {category.calculators.map((calculator, index) => (
                              <CalculatorCard key={calculator.id} calculator={calculator} index={index} />
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
              <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                {calculatorCategories.map((category, index) => (
                  <CategoryCard key={category.id} category={category} index={index} />
                ))}
              </div>
            </section>

            <section className="animate-fade-in">
              <div className="rounded-xl bg-primary/5 border border-primary/10 p-5">
                <h2 className="font-display text-lg font-semibold mb-2">{t.quickTips}</h2>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>• {t.tip1}</li>
                  <li>• {t.tip2}</li>
                  <li>• {t.tip3}</li>
                </ul>
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
