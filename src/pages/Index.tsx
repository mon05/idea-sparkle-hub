import Layout from "@/components/layout/Layout";
import CategoryCard from "@/components/calculator/CategoryCard";
import { calculatorCategories } from "@/data/calculators";
import { Wine } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center py-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-wine shadow-glow mb-4">
            <Wine className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Winemaking Calculator
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Professional calculations for acid additions, fining agents, sulfur management, and more.
          </p>
        </section>

        {/* Categories Grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculatorCategories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </section>

        {/* Quick Tips */}
        <section className="animate-fade-in opacity-0 stagger-6">
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-5">
            <h2 className="font-display text-lg font-semibold mb-2">Quick Tips</h2>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>• Always conduct bench trials before making large batch adjustments</li>
              <li>• Record all additions in your cellar log for traceability</li>
              <li>• Double-check calculations before adding any chemicals</li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
