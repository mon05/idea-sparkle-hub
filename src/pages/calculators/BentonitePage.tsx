import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const BentonitePage = () => {
  const fields = [
    {
      id: "volume",
      label: "Wine Volume",
      unit: "L",
      placeholder: "1000",
    },
    {
      id: "rate",
      label: "Addition Rate",
      unit: "g/hL",
      placeholder: "50",
      helpText: "Typical range: 25-100 g/hL based on bench trials",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { volume, rate } = values;
    // Convert g/hL to total grams needed
    const hectoliters = volume / 100;
    const bentoniteNeeded = rate * hectoliters;
    
    return {
      result: bentoniteNeeded,
      unit: "g",
      details: `Add ${bentoniteNeeded.toFixed(1)} grams of bentonite (${rate} g/hL rate)`,
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Bentonite Addition
          </h1>
          <p className="text-muted-foreground">
            Calculate bentonite additions for protein stabilization.
          </p>
        </section>

        <AdditionCalculator
          title="Bentonite Calculator"
          description="Calculate bentonite fining based on volume and treatment rate"
          fields={fields}
          calculate={calculate}
          resultLabel="Bentonite needed"
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">Preparation</h3>
          <ul className="space-y-1">
            <li>• Hydrate bentonite in 10x its weight in water</li>
            <li>• Allow to swell for 24-48 hours</li>
            <li>• Stir thoroughly before adding to wine</li>
            <li>• Always run bench trials first</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default BentonitePage;
