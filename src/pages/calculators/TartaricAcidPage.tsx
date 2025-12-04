import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const TartaricAcidPage = () => {
  const fields = [
    {
      id: "volume",
      label: "Wine Volume",
      unit: "L",
      placeholder: "1000",
      helpText: "Total volume of wine to be adjusted",
    },
    {
      id: "currentTA",
      label: "Current Total Acidity",
      unit: "g/L",
      placeholder: "5.0",
      helpText: "Measured as tartaric acid",
    },
    {
      id: "targetTA",
      label: "Target Total Acidity",
      unit: "g/L",
      placeholder: "6.5",
      helpText: "Desired total acidity level",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { volume, currentTA, targetTA } = values;
    const difference = targetTA - currentTA;
    // Tartaric acid addition: approximately 1 g/L tartaric acid increases TA by 1 g/L
    const tartaricNeeded = difference * volume;
    
    return {
      result: tartaricNeeded,
      unit: "g",
      details: difference > 0 
        ? `Add ${tartaricNeeded.toFixed(1)} grams of tartaric acid to increase TA by ${difference.toFixed(2)} g/L`
        : "No addition needed - current TA is already at or above target",
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Tartaric Acid Addition
          </h1>
          <p className="text-muted-foreground">
            Calculate the amount of tartaric acid needed to increase total acidity.
          </p>
        </section>

        <AdditionCalculator
          title="Tartaric Acid Calculator"
          description="Calculate tartaric acid addition based on volume and desired TA increase"
          fields={fields}
          calculate={calculate}
          resultLabel="Tartaric acid needed"
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">Notes</h3>
          <ul className="space-y-1">
            <li>• Always conduct a bench trial before adding to the entire batch</li>
            <li>• Tartaric acid is the preferred acid for grape wines</li>
            <li>• Maximum legal addition varies by region - check local regulations</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default TartaricAcidPage;
