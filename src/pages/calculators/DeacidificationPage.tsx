import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const DeacidificationPage = () => {
  const fields = [
    {
      id: "volume",
      label: "Wine Volume",
      unit: "L",
      placeholder: "1000",
    },
    {
      id: "currentTA",
      label: "Current Total Acidity",
      unit: "g/L",
      placeholder: "9.0",
    },
    {
      id: "targetTA",
      label: "Target Total Acidity",
      unit: "g/L",
      placeholder: "7.0",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { volume, currentTA, targetTA } = values;
    const reduction = currentTA - targetTA;
    
    // Potassium bicarbonate: ~0.67 g neutralizes 1 g tartaric acid
    // Calcium carbonate: ~0.5 g neutralizes 1 g tartaric acid
    const kBicarbNeeded = reduction * volume * 0.67;
    const calciumCarbNeeded = reduction * volume * 0.5;
    
    return {
      result: kBicarbNeeded,
      unit: "g KHCO₃",
      details: reduction > 0 
        ? `Add ${kBicarbNeeded.toFixed(0)} g potassium bicarbonate OR ${calciumCarbNeeded.toFixed(0)} g calcium carbonate to reduce TA by ${reduction.toFixed(1)} g/L`
        : "No deacidification needed",
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Deacidification
          </h1>
          <p className="text-muted-foreground">
            Calculate deacidification agents to reduce total acidity.
          </p>
        </section>

        <AdditionCalculator
          title="Deacidification Calculator"
          description="Calculate potassium bicarbonate or calcium carbonate additions"
          fields={fields}
          calculate={calculate}
          resultLabel="Deacidification agent needed"
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">Options</h3>
          <ul className="space-y-1">
            <li>• <strong>Potassium bicarbonate (KHCO₃):</strong> Safer, no tartrate instability</li>
            <li>• <strong>Calcium carbonate (CaCO₃):</strong> More effective, but may cause calcium tartrate haze</li>
            <li>• Add in stages, testing after each addition</li>
            <li>• Cold stabilize after treatment</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default DeacidificationPage;
