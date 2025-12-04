import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const CopperSulfatePage = () => {
  const fields = [
    {
      id: "volume",
      label: "Wine Volume",
      unit: "L",
      placeholder: "1000",
    },
    {
      id: "rate",
      label: "Copper Addition Rate",
      unit: "mg Cu/L",
      placeholder: "0.5",
      helpText: "Typical range: 0.25-0.5 mg/L as copper",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { volume, rate } = values;
    // Copper sulfate pentahydrate is 25.5% copper
    const copperSulfateNeeded = (rate * volume) / 0.255;
    
    return {
      result: copperSulfateNeeded,
      unit: "mg",
      details: `Add ${copperSulfateNeeded.toFixed(1)} mg (${(copperSulfateNeeded/1000).toFixed(3)} g) of copper sulfate pentahydrate`,
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Copper Sulfate Addition
          </h1>
          <p className="text-muted-foreground">
            Calculate copper sulfate additions to remove hydrogen sulfide and reduce excessive SO₂.
          </p>
        </section>

        <AdditionCalculator
          title="Copper Sulfate Calculator"
          description="Calculate copper treatment for H₂S removal"
          fields={fields}
          calculate={calculate}
          resultLabel="Copper sulfate needed"
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">Guidelines</h3>
          <ul className="space-y-1">
            <li>• Legal limit: 1 mg/L copper in finished wine</li>
            <li>• Start with lower rates and retest</li>
            <li>• May require filtration after treatment</li>
            <li>• Conduct bench trials first</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default CopperSulfatePage;
