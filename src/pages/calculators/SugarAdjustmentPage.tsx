import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";
import { useLanguage } from "@/i18n/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const SugarAdjustmentPage = () => {
  const { t } = useLanguage();
  const pageT = t.calculatorPages?.sugarAdjustment;
  const [activeTab, setActiveTab] = useState("sugar");

  // Sugar fields
  const sugarFields = [
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

  // MCR fields
  const mcrFields = [
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
    {
      id: "mcrBrix",
      label: pageT?.fields?.mcrBrix?.label || "MCR Brix",
      unit: "°Bx",
      placeholder: "65",
      helpText: pageT?.fields?.mcrBrix?.helpText || "Brix of the MCR (typically 65°Bx)",
    },
  ];

  const calculateSugar = (values: Record<string, number>) => {
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

  const calculateMCR = (values: Record<string, number>) => {
    const { volume, currentBrix, targetBrix, mcrBrix } = values;
    const difference = targetBrix - currentBrix;
    
    if (difference <= 0) {
      return {
        result: 0,
        unit: "L",
        details: pageT?.noAddition || "No MCR addition needed - current Brix is at or above target",
      };
    }

    // MCR calculation using mass balance:
    // (V1 × B1 + V2 × B2) / (V1 + V2) = B_target
    // Solving for V2 (MCR volume):
    // V2 = V1 × (B_target - B1) / (B2 - B_target)
    const mcrVolume = volume * (targetBrix - currentBrix) / (mcrBrix - targetBrix);
    const mcrPerLiter = (mcrVolume / volume) * 1000; // mL per liter
    const finalVolume = volume + mcrVolume;
    
    const resultText = pageT?.mcrResult
      ?.replace("{amount}", mcrVolume.toFixed(2))
      ?.replace("{perLiter}", mcrPerLiter.toFixed(1))
      ?.replace("{difference}", difference.toFixed(1))
      ?.replace("{finalVolume}", finalVolume.toFixed(1))
      || `Add ${mcrVolume.toFixed(2)} L of MCR (${mcrPerLiter.toFixed(1)} mL/L) to increase Brix by ${difference.toFixed(1)}°. Final volume: ${finalVolume.toFixed(1)} L`;
    
    return {
      result: mcrVolume,
      unit: "L",
      details: resultText,
    };
  };

  const sugarNotes = pageT?.notes || [
    "Chaptalization is regulated or prohibited in some regions",
    "Add sugar before or during fermentation, not after",
    "Dissolve sugar in a small amount of must before adding",
    "1°Brix increase ≈ 0.55% potential alcohol increase",
  ];

  const mcrNotes = pageT?.mcrNotes || [
    "MCR (Rectified Concentrated Must) is a natural grape product",
    "MCR is permitted in EU wine regions where chaptalization is not allowed",
    "Standard MCR concentration is around 65°Brix",
    "Adding MCR increases total volume of must",
    "MCR adds grape character unlike refined sugar",
  ];

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            {pageT?.title || "Sugar Adjustment"}
          </h1>
          <p className="text-muted-foreground">
            {pageT?.description || "Calculate sugar or MCR additions to increase Brix levels."}
          </p>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sugar">{pageT?.sugarTab || "Sugar"}</TabsTrigger>
            <TabsTrigger value="mcr">{pageT?.mcrTab || "MCR"}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sugar" className="mt-4">
            <AdditionCalculator
              title={pageT?.calcTitle || "Sugar Adjustment Calculator"}
              description={pageT?.calcDescription || "Calculate sugar needed to reach target Brix level"}
              fields={sugarFields}
              calculate={calculateSugar}
              resultLabel={pageT?.resultLabel || "Sugar needed"}
            />
            
            <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in mt-4">
              <h3 className="font-semibold text-foreground mb-2">{t.notes}</h3>
              <ul className="space-y-1">
                {sugarNotes.map((note, index) => (
                  <li key={index}>• {note}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="mcr" className="mt-4">
            <AdditionCalculator
              title={pageT?.mcrCalcTitle || "MCR Addition Calculator"}
              description={pageT?.mcrCalcDescription || "Calculate MCR needed to reach target Brix level"}
              fields={mcrFields}
              calculate={calculateMCR}
              resultLabel={pageT?.mcrResultLabel || "MCR needed"}
            />
            
            <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in mt-4">
              <h3 className="font-semibold text-foreground mb-2">{t.notes}</h3>
              <ul className="space-y-1">
                {mcrNotes.map((note, index) => (
                  <li key={index}>• {note}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SugarAdjustmentPage;
