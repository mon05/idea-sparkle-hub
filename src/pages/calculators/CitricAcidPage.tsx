import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const CitricAcidPage = () => {
  const fields = [
    {
      id: "volume",
      label: "Wine Volume",
      unit: "L",
      placeholder: "1000",
    },
    {
      id: "addition",
      label: "Desired Addition Rate",
      unit: "g/L",
      placeholder: "0.5",
      helpText: "Typical range: 0.1-0.5 g/L",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { volume, addition } = values;
    const citricNeeded = addition * volume;
    
    return {
      result: citricNeeded,
      unit: "g",
      details: `Add ${citricNeeded.toFixed(1)} grams of citric acid for ${addition} g/L addition`,
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Citric Acid Addition
          </h1>
          <p className="text-muted-foreground">
            Calculate citric acid additions for flavor enhancement and microbial stability.
          </p>
        </section>

        <AdditionCalculator
          title="Citric Acid Calculator"
          description="Calculate citric acid addition based on volume and desired rate"
          fields={fields}
          calculate={calculate}
          resultLabel="Citric acid needed"
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">Notes</h3>
          <ul className="space-y-1">
            <li>• Add only after malolactic fermentation is complete</li>
            <li>• Can be metabolized by lactic acid bacteria</li>
            <li>• EU limit: 1 g/L maximum</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default CitricAcidPage;
