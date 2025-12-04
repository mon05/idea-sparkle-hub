import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const AlcoholAdditionPage = () => {
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
      placeholder: "12.5",
    },
    {
      id: "targetAlc",
      label: "Target Alcohol",
      unit: "% v/v",
      placeholder: "15.0",
    },
    {
      id: "spiritAlc",
      label: "Spirit Alcohol",
      unit: "% v/v",
      placeholder: "96",
      helpText: "Alcohol content of the spirit being added",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { wineVolume, currentAlc, targetAlc, spiritAlc } = values;
    
    // V1*C1 + V2*C2 = (V1+V2)*Ct
    // Solving for V2: V2 = V1*(Ct-C1)/(C2-Ct)
    const spiritNeeded = (wineVolume * (targetAlc - currentAlc)) / (spiritAlc - targetAlc);
    const finalVolume = wineVolume + spiritNeeded;
    
    return {
      result: spiritNeeded,
      unit: "L",
      details: `Add ${spiritNeeded.toFixed(2)} L of ${spiritAlc}% spirit. Final volume: ${finalVolume.toFixed(1)} L`,
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Alcohol Addition
          </h1>
          <p className="text-muted-foreground">
            Calculate spirit additions for fortification or alcohol adjustment.
          </p>
        </section>

        <AdditionCalculator
          title="Spirit Addition Calculator"
          description="Calculate spirit volume needed to reach target alcohol"
          fields={fields}
          calculate={calculate}
          resultLabel="Spirit needed"
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">Notes</h3>
          <ul className="space-y-1">
            <li>• Use neutral grape spirit for fortified wines</li>
            <li>• Add spirit gradually while mixing</li>
            <li>• Check regulations for your wine type</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AlcoholAdditionPage;
