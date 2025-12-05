import { useParams, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CalculatorCard from "@/components/calculator/CalculatorCard";
import { calculatorCategories } from "@/data/calculators";
import { useLanguage } from "@/i18n/LanguageContext";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = calculatorCategories.find((c) => c.id === categoryId);
  const { t } = useLanguage();

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const categoryTranslation = t.categories[category.id as keyof typeof t.categories];

  return (
    <Layout>
      <div className="space-y-6">
        <section className="animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{category.icon}</span>
            <h1 className="text-2xl md:text-3xl font-display font-bold">
              {categoryTranslation?.name || category.name}
            </h1>
          </div>
          <p className="text-muted-foreground">{categoryTranslation?.description || category.description}</p>
        </section>

        <section className="grid gap-3">
          {category.calculators.map((calculator, index) => (
            <CalculatorCard key={calculator.id} calculator={calculator} index={index} />
          ))}
        </section>
      </div>
    </Layout>
  );
};

export default CategoryPage;
