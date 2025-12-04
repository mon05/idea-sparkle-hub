import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const CarbonPage = () => {
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
      placeholder: "25",
      helpText: "Typical range: 10-100 g/hL based on severity",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { volume, rate } = values;
    const hectoliters = volume / 100;
    const carbonNeeded = rate * hectoliters;
    
    return {
      result: carbonNeeded,
      unit: "g",
      details: `Add ${carbonNeeded.toFixed(1)} grams of activated carbon`,
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Carbon Addition
          </h1>
          <p className="text-muted-foreground">
            Calculate activated carbon additions for color and odor removal.
          </p>
        </section>

        <AdditionCalculator
          title="Activated Carbon Calculator"
          description="Calculate carbon fining based on volume and treatment rate"
          fields={fields}
          calculate={calculate}
          resultLabel="Carbon needed"
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">Usage Notes</h3>
          <ul className="space-y-1">
            <li>• Used for removing off-odors and excess color</li>
            <li>• Make a slurry with water before adding</li>
            <li>• Contact time: 1-24 hours depending on treatment</li>
            <li>• Always filter after treatment</li>
            <li>• Conduct bench trials - can strip desirable compounds</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default CarbonPage;
