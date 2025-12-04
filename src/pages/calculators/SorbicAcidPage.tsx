import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const SorbicAcidPage = () => {
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
      unit: "mg/L",
      placeholder: "200",
      helpText: "Typical range: 150-250 mg/L",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { volume, rate } = values;
    const sorbicNeeded = (rate * volume) / 1000;
    
    return {
      result: sorbicNeeded,
      unit: "g",
      details: `Add ${sorbicNeeded.toFixed(1)} grams of sorbic acid (or ${(sorbicNeeded * 1.34).toFixed(1)} g potassium sorbate)`,
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Sorbic Acid Addition
          </h1>
          <p className="text-muted-foreground">
            Calculate sorbic acid additions to prevent refermentation.
          </p>
        </section>

        <AdditionCalculator
          title="Sorbic Acid Calculator"
          description="Calculate sorbic acid for yeast inhibition"
          fields={fields}
          calculate={calculate}
          resultLabel="Sorbic acid needed"
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">Important Notes</h3>
          <ul className="space-y-1">
            <li>• Must be used with adequate SO₂ levels</li>
            <li>• Do NOT use in wines that may undergo MLF</li>
            <li>• Maximum legal limit: 200 mg/L in many regions</li>
            <li>• Potassium sorbate is often preferred (better solubility)</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default SorbicAcidPage;
