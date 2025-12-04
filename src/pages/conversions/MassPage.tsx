import Layout from "@/components/layout/Layout";
import ConversionCalculator from "@/components/calculator/ConversionCalculator";
import { conversionCategories } from "@/data/calculators";

const MassPage = () => {
  const category = conversionCategories.find((c) => c.id === "mass")!;

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Mass Converter
          </h1>
          <p className="text-muted-foreground">
            Convert between mass units from nanograms to tonnes.
          </p>
        </section>

        <ConversionCalculator category={category} />
      </div>
    </Layout>
  );
};

export default MassPage;
