import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wine, ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { calculatorCategories } from "@/data/calculators";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageContext";
import CalculationHistory from "@/components/CalculationHistory";
import CellarTasks from "@/components/CellarTasks";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);
  const { t, language } = useLanguage();

  const goBack = () => {
    // A deep link/initial load has no in-app history entry to return to.
    if (typeof window.history.state?.idx === "number" && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-effect">
      <div className="container flex h-16 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1 sm:gap-3">
          {!isHome && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={goBack}
              aria-label={language === "ka" ? "უკან დაბრუნება" : "Go back"}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg gradient-wine shadow-soft">
              <Wine className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="truncate font-display text-base font-semibold tracking-tight sm:text-xl">
              {t.appName}
            </span>
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <div className="hidden items-center gap-1 sm:flex">
            <CellarTasks />
            <CalculationHistory />
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={language === "ka" ? "მენიუს გახსნა" : "Open menu"}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,100vw)] overflow-y-auto">
              <nav className="mt-8 flex flex-col gap-4 pb-8">
                <div className="flex items-center justify-around gap-1 border-b pb-3 sm:hidden">
                  <CellarTasks />
                  <CalculationHistory />
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
                <Accordion type="single" collapsible className="space-y-1">
                  {calculatorCategories.map((category) => {
                    const translation = t.categories[category.id as keyof typeof t.categories];
                    return (
                      <AccordionItem key={category.id} value={category.id} className="border-b border-border/50">
                        <AccordionTrigger className="gap-2 py-3 text-left hover:no-underline">
                          <span aria-hidden="true">{category.icon}</span>
                          <span className="flex-1 font-medium">{translation?.name || category.name}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-1 pl-6">
                            {category.calculators.map((calculator) => {
                              const item = t.calculators[calculator.id as keyof typeof t.calculators];
                              return (
                                <Link
                                  key={calculator.id}
                                  to={calculator.path}
                                  onClick={() => setOpen(false)}
                                  className="rounded-md py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                                >
                                  {item?.name || calculator.name}
                                </Link>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
