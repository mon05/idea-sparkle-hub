import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const AlcoholDilutionPage = () => {
  const fields = [
    {
      id: "wineVolume",
      label: "Wine Volume",
      unit: "L",
      placeholder: "1000",
    },
    {
      id: "currentAlc",
      label: "Current Alcohol",
      unit: "% v/v",
      placeholder: "15.5",
    },
    {
      id: "targetAlc",
      label: "Target Alcohol",
      unit: "% v/v",
      placeholder: "14.0",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { wineVolume, currentAlc, targetAlc } = values;
    
    // V1*C1 = (V1+V2)*Ct
    // V2 = V1*(C1-Ct)/Ct
    const waterNeeded = (wineVolume * (currentAlc - targetAlc)) / targetAlc;
    const finalVolume = wineVolume + waterNeeded;
    
    return {
      result: waterNeeded,
      unit: "L",
      details: `Add ${waterNeeded.toFixed(2)} L of water. Final volume: ${finalVolume.toFixed(1)} L`,
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Alcohol Dilution
          </h1>
          <p className="text-muted-foreground">
            Calculate water addition to reduce alcohol content.
          </p>
        </section>

        <AdditionCalculator
          title="Dilution Calculator"
          description="Calculate water volume needed to reach target alcohol"
          fields={fields}
          calculate={calculate}
          resultLabel="Water needed"
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">Important</h3>
          <ul className="space-y-1">
            <li>• Check local regulations on water addition</li>
            <li>• Use deionized or distilled water</li>
            <li>• Dilution affects all wine components proportionally</li>
            <li>• Consider impact on flavor concentration</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AlcoholDilutionPage;
