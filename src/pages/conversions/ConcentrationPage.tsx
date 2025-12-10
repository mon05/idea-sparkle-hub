import Layout from "@/components/layout/Layout";
import ConversionCalculator from "@/components/calculator/ConversionCalculator";
import { conversionCategories } from "@/data/calculators";
import { useLanguage } from "@/i18n/LanguageContext";

const ConcentrationPage = () => {
  const category = conversionCategories.find((c) => c.id === "concentration")!;
  const { t } = useLanguage();
  const calcTranslation = t.calculators.concentration;

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            {calcTranslation.pageTitle}
          </h1>
          <p className="text-muted-foreground">
            {calcTranslation.pageDescription}
          </p>
        </section>

        <ConversionCalculator category={category} />
      </div>
    </Layout>
  );
};

export default ConcentrationPage;
