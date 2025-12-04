import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const TanninPage = () => {
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
      placeholder: "10",
      helpText: "Typical range: 5-30 g/hL depending on tannin type",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { volume, rate } = values;
    const hectoliters = volume / 100;
    const tanninNeeded = rate * hectoliters;
    
    return {
      result: tanninNeeded,
      unit: "g",
      details: `Add ${tanninNeeded.toFixed(1)} grams of tannin`,
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Tannin Addition
          </h1>
          <p className="text-muted-foreground">
            Calculate tannin additions for structure and mouthfeel.
          </p>
        </section>

        <AdditionCalculator
          title="Tannin Calculator"
          description="Calculate tannin addition based on volume and rate"
          fields={fields}
          calculate={calculate}
          resultLabel="Tannin needed"
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">Tannin Types</h3>
          <ul className="space-y-1">
            <li>• Grape seed: Structure, astringency</li>
            <li>• Grape skin: Color stabilization, body</li>
            <li>• Oak: Vanilla, toast, structure</li>
            <li>• Chestnut/Quebracho: Antioxidant, mouthfeel</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default TanninPage;
