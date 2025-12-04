import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const PVPPPage = () => {
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
      placeholder: "30",
      helpText: "Typical range: 10-80 g/hL",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { volume, rate } = values;
    const hectoliters = volume / 100;
    const pvppNeeded = rate * hectoliters;
    
    return {
      result: pvppNeeded,
      unit: "g",
      details: `Add ${pvppNeeded.toFixed(1)} grams of PVPP`,
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            PVPP Addition
          </h1>
          <p className="text-muted-foreground">
            Calculate PVPP additions for phenolic and color management.
          </p>
        </section>

        <AdditionCalculator
          title="PVPP Calculator"
          description="Calculate PVPP fining based on volume and treatment rate"
          fields={fields}
          calculate={calculate}
          resultLabel="PVPP needed"
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">Applications</h3>
          <ul className="space-y-1">
            <li>• Removes browning phenolics</li>
            <li>• Reduces bitterness and astringency</li>
            <li>• Prevents pinking in white wines</li>
            <li>• Contact time: 1-24 hours</li>
            <li>• Must be filtered after treatment</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default PVPPPage;
