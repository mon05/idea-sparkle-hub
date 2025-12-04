import { Link, useLocation } from "react-router-dom";
import { Wine, ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { calculatorCategories } from "@/data/calculators";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-effect">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          {!isHome && (
            <Link to="/">
              <Button variant="ghost" size="icon" className="mr-1">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-wine shadow-soft">
              <Wine className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">
              WineCalc
            </span>
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <nav className="flex flex-col gap-4 mt-8">
              {calculatorCategories.map((category) => (
                <div key={category.id}>
                  <h3 className="font-display font-semibold mb-2 flex items-center gap-2">
                    <span>{category.icon}</span>
                    {category.name}
                  </h3>
                  <div className="flex flex-col gap-1 pl-6">
                    {category.calculators.map((calc) => (
                      <Link
                        key={calc.id}
                        to={calc.path}
                        onClick={() => setOpen(false)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        {calc.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
