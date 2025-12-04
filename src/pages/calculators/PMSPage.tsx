import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const PMSPage = () => {
  const fields = [
    {
      id: "volume",
      label: "Wine Volume",
      unit: "L",
      placeholder: "1000",
    },
    {
      id: "currentSO2",
      label: "Current Free SO₂",
      unit: "mg/L",
      placeholder: "15",
    },
    {
      id: "targetSO2",
      label: "Target Free SO₂",
      unit: "mg/L",
      placeholder: "35",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { volume, currentSO2, targetSO2 } = values;
    const difference = targetSO2 - currentSO2;
    // PMS is ~57% SO2, so we need ~1.75x the SO2 amount
    const pmsNeeded = (difference * volume * 1.75) / 1000;
    
    return {
      result: pmsNeeded,
      unit: "g",
      details: difference > 0 
        ? `Add ${pmsNeeded.toFixed(2)} grams of potassium metabisulfite to increase free SO₂ by ${difference} mg/L`
        : "No addition needed - current SO₂ is at or above target",
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            PMS Addition
          </h1>
          <p className="text-muted-foreground">
            Calculate potassium metabisulfite (PMS) additions for SO₂ management.
          </p>
        </section>

        <AdditionCalculator
          title="Potassium Metabisulfite Calculator"
          description="Calculate PMS addition to achieve target free SO₂ levels"
          fields={fields}
          calculate={calculate}
          resultLabel="PMS needed"
        />

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">Target SO₂ Guidelines</h3>
          <ul className="space-y-1">
            <li>• Dry whites: 25-40 mg/L free SO₂</li>
            <li>• Dry reds: 20-35 mg/L free SO₂</li>
            <li>• Sweet wines: 40-60 mg/L free SO₂</li>
            <li>• Adjust based on pH - lower pH needs less SO₂</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default PMSPage;
