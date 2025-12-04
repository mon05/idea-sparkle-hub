import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const FiningTrialPage = () => {
  const [batchVolume, setBatchVolume] = useState("");
  const [trialVolume, setTrialVolume] = useState("100");
  const [stockConcentration, setStockConcentration] = useState("1");
  
  const calculateTrialAdditions = () => {
    const trialVol = parseFloat(trialVolume) || 100;
    const stockConc = parseFloat(stockConcentration) || 1;
    const batchVol = parseFloat(batchVolume) || 0;
    
    // Standard trial rates for bentonite in g/hL: 25, 50, 75, 100
    const rates = [25, 50, 75, 100];
    
    return rates.map(rate => {
      // mL of stock = (rate g/hL * trial volume L / 100) / stock concentration g/mL
      const stockMl = (rate * trialVol / 100) / stockConc;
      const batchGrams = batchVol > 0 ? (rate * batchVol / 100) : 0;
      
      return {
        rate,
        stockMl: stockMl.toFixed(2),
        batchGrams: batchGrams.toFixed(0),
      };
    });
  };

  const trials = calculateTrialAdditions();

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Fining Trial Calculator
          </h1>
          <p className="text-muted-foreground">
            Calculate bench trial additions and scale up to production volumes.
          </p>
        </section>

        <Card variant="elevated" className="animate-scale-in">
          <CardHeader>
            <CardTitle>Trial Setup</CardTitle>
            <CardDescription>Configure your bench trial parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="trialVolume">Trial Sample Volume (mL)</Label>
              <Input
                id="trialVolume"
                type="text"
                inputMode="decimal"
                value={trialVolume}
                onChange={(e) => setTrialVolume(e.target.value)}
                placeholder="100"
              />
            </div>
            <div>
              <Label htmlFor="stockConcentration">Stock Solution (g/mL)</Label>
              <Input
                id="stockConcentration"
                type="text"
                inputMode="decimal"
                value={stockConcentration}
                onChange={(e) => setStockConcentration(e.target.value)}
                placeholder="1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                e.g., 1 g/mL = 1g fining agent in 1mL water
              </p>
            </div>
            <div>
              <Label htmlFor="batchVolume">Production Batch Volume (L)</Label>
              <Input
                id="batchVolume"
                type="text"
                inputMode="decimal"
                value={batchVolume}
                onChange={(e) => setBatchVolume(e.target.value)}
                placeholder="Optional - for scale-up"
              />
            </div>
          </CardContent>
        </Card>

        <Card variant="wine" className="animate-fade-in">
          <CardHeader>
            <CardTitle>Trial Additions</CardTitle>
            <CardDescription>Stock solution volumes for each trial rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-xs font-medium text-muted-foreground border-b border-border pb-2">
                <span>Rate (g/hL)</span>
                <span>Stock (mL)</span>
                <span>Batch (g)</span>
              </div>
              {trials.map((trial, index) => (
                <div key={trial.rate} className={`grid grid-cols-3 gap-2 text-sm animate-fade-in stagger-${index + 1}`}>
                  <span className="font-medium">{trial.rate}</span>
                  <span className="text-primary font-semibold">{trial.stockMl}</span>
                  <span className="text-muted-foreground">{batchVolume ? trial.batchGrams : '—'}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">How to Use</h3>
          <ol className="space-y-1 list-decimal list-inside">
            <li>Prepare stock solution (e.g., 1g fining agent in 1mL water)</li>
            <li>Measure trial samples into labeled containers</li>
            <li>Add calculated stock volumes to each trial</li>
            <li>Mix well and allow to settle (24-48 hours)</li>
            <li>Evaluate clarity and select best rate</li>
            <li>Scale up using batch calculation</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default FiningTrialPage;
