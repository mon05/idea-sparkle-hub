import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";
import { useLanguage } from "@/i18n/LanguageContext";

const SugarAdjustmentPage = () => {
  const { t } = useLanguage();
  const pageT = t.calculatorPages?.sugarAdjustment;

  const fields = [
    {
      id: "volume",
      label: pageT?.fields?.volume?.label || "Must/Wine Volume",
      unit: "L",
      placeholder: "1000",
      helpText: pageT?.fields?.volume?.helpText || "Volume of must or wine to adjust",
    },
    {
      id: "currentBrix",
      label: pageT?.fields?.currentBrix?.label || "Current Brix",
      unit: "°Bx",
      placeholder: "18",
      helpText: pageT?.fields?.currentBrix?.helpText || "Measured sugar content",
    },
    {
      id: "targetBrix",
      label: pageT?.fields?.targetBrix?.label || "Target Brix",
      unit: "°Bx",
      placeholder: "24",
      helpText: pageT?.fields?.targetBrix?.helpText || "Desired sugar content",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { volume, currentBrix, targetBrix } = values;
    const difference = targetBrix - currentBrix;
    
    if (difference <= 0) {
      return {
        result: 0,
        unit: "g",
        details: pageT?.noAddition || "No sugar addition needed - current Brix is at or above target",
      };
    }
    
    // Sugar addition calculation:
    // 1 °Brix ≈ 10 g/L sugar, so to increase by X °Brix, add approximately X * 10 g/L
    // More precise: 1.8 g sugar per liter increases Brix by approximately 0.1°
    // So to increase by 1°Brix, need about 18 g/L
    const sugarPerLiter = difference * 18; // grams per liter
    const totalSugar = sugarPerLiter * volume;
    
    const resultText = pageT?.result
      ?.replace("{amount}", totalSugar.toFixed(0))
      ?.replace("{perLiter}", sugarPerLiter.toFixed(1))
      ?.replace("{difference}", difference.toFixed(1))
      || `Add ${totalSugar.toFixed(0)} grams of sugar (${sugarPerLiter.toFixed(1)} g/L) to increase Brix by ${difference.toFixed(1)}°`;
    
    return {
      result: totalSugar,
      unit: "g",
      details: resultText,
    };
  };

  const notes = pageT?.notes || [
    "Chaptalization is regulated or prohibited in some regions",
    "Add sugar before or during fermentation, not after",
    "Dissolve sugar in a small amount of must before adding",
    "1°Brix increase ≈ 0.55% potential alcohol increase",
  ];

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            {pageT?.title || "Sugar Adjustment"}
          </h1>
          <p className="text-muted-foreground">
            {pageT?.description || "Calculate sugar additions to increase Brix levels for chaptalization."}
          </p>
        </section>

        <AdditionCalculator
          title={pageT?.calcTitle || "Sugar Adjustment Calculator"}
          description={pageT?.calcDescription || "Calculate sugar needed to reach target Brix level"}
          fields={fields}
          calculate={calculate}
          resultLabel={pageT?.resultLabel || "Sugar needed"}
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">{t.notes}</h3>
          <ul className="space-y-1">
            {notes.map((note, index) => (
              <li key={index}>• {note}</li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default SugarAdjustmentPage;
