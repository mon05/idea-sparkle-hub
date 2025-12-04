import Layout from "@/components/layout/Layout";
import AdditionCalculator from "@/components/calculator/AdditionCalculator";

const HydrogenPeroxidePage = () => {
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
      placeholder: "80",
    },
    {
      id: "targetSO2",
      label: "Target Free SO₂",
      unit: "mg/L",
      placeholder: "30",
    },
    {
      id: "h2o2Concentration",
      label: "H₂O₂ Concentration",
      unit: "%",
      placeholder: "3",
      helpText: "Common concentrations: 3% or 30%",
    },
  ];

  const calculate = (values: Record<string, number>) => {
    const { volume, currentSO2, targetSO2, h2o2Concentration } = values;
    const so2ToRemove = currentSO2 - targetSO2;
    
    // Stoichiometry: H2O2 + SO2 → H2SO4
    // Molar ratio 1:1, H2O2 MW=34, SO2 MW=64
    // mg H2O2 needed = mg SO2 * (34/64) = mg SO2 * 0.531
    const h2o2Pure = (so2ToRemove * volume * 0.531) / 1000; // grams of pure H2O2
    const h2o2Solution = (h2o2Pure * 100) / h2o2Concentration; // grams of solution
    
    return {
      result: h2o2Solution,
      unit: "mL",
      details: so2ToRemove > 0 
        ? `Add ${h2o2Solution.toFixed(1)} mL of ${h2o2Concentration}% H₂O₂ to reduce SO₂ by ${so2ToRemove} mg/L`
        : "No reduction needed",
    };
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Hydrogen Peroxide Addition
          </h1>
          <p className="text-muted-foreground">
            Calculate hydrogen peroxide to decrease excessive SO₂ levels.
          </p>
        </section>

        <AdditionCalculator
          title="H₂O₂ Calculator"
          description="Calculate hydrogen peroxide to reduce free SO₂"
          fields={fields}
          calculate={calculate}
          resultLabel="H₂O₂ solution needed"
        />

        <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm animate-fade-in">
          <h3 className="font-semibold text-destructive mb-2">⚠️ Caution</h3>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Add slowly with thorough mixing</li>
            <li>• Can cause oxidation if over-applied</li>
            <li>• Test SO₂ after 24 hours</li>
            <li>• Consider alternatives like aeration first</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default HydrogenPeroxidePage;
