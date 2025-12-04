import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const MalicAcidPage = () => {
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
      placeholder: "5.0",
    },
    {
      id: "targetTA",
      label: "Target Total Acidity",
      unit: "g/L",
      placeholder: "6.0",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { volume, currentTA, targetTA } = values;
    const difference = targetTA - currentTA;
    // Malic acid is slightly weaker than tartaric (factor ~1.12)
    const malicNeeded = difference * volume * 1.12;
    
    return {
      result: malicNeeded,
      unit: "g",
      details: difference > 0 
        ? `Add ${malicNeeded.toFixed(1)} grams of malic acid to increase TA by ${difference.toFixed(2)} g/L`
        : "No addition needed",
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Malic Acid Addition
          </h1>
          <p className="text-muted-foreground">
            Calculate malic acid additions for acidity adjustment.
          </p>
        </section>

        <AdditionCalculator
          title="Malic Acid Calculator"
          description="Calculate malic acid addition based on volume and desired TA increase"
          fields={fields}
          calculate={calculate}
          resultLabel="Malic acid needed"
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">Notes</h3>
          <ul className="space-y-1">
            <li>• Not recommended for wines undergoing MLF</li>
            <li>• Provides a "green apple" character</li>
            <li>• Often used in combination with tartaric acid</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default MalicAcidPage;
