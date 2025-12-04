import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const DAPPage = () => {
  const fields = [
    {
      id: "volume",
      label: "Must/Wine Volume",
      unit: "L",
      placeholder: "1000",
    },
    {
      id: "currentYAN",
      label: "Current YAN",
      unit: "mg N/L",
      placeholder: "100",
      helpText: "Yeast Assimilable Nitrogen",
    },
    {
      id: "targetYAN",
      label: "Target YAN",
      unit: "mg N/L",
      placeholder: "250",
      helpText: "Recommended: 200-300 mg N/L for most ferments",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { volume, currentYAN, targetYAN } = values;
    const difference = targetYAN - currentYAN;
    // DAP provides 210 mg N per gram
    const dapNeeded = (difference * volume) / 210;
    
    return {
      result: dapNeeded,
      unit: "g",
      details: difference > 0 
        ? `Add ${dapNeeded.toFixed(1)} grams of DAP to increase YAN by ${difference} mg N/L`
        : "No addition needed",
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            DAP Addition
          </h1>
          <p className="text-muted-foreground">
            Calculate diammonium phosphate additions for yeast nutrient management.
          </p>
        </section>

        <AdditionCalculator
          title="DAP Calculator"
          description="Calculate DAP addition to achieve target YAN levels"
          fields={fields}
          calculate={calculate}
          resultLabel="DAP needed"
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">Guidelines</h3>
          <ul className="space-y-1">
            <li>• Add in stages during fermentation</li>
            <li>• Do not exceed 200 mg/L total DAP addition</li>
            <li>• Best added when fermentation is active</li>
            <li>• Consider using complex nutrients alongside DAP</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default DAPPage;
