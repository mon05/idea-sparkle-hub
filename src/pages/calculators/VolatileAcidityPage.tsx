import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCalculationHistory } from "@/hooks/useCalculationHistory";
import { toast } from "sonner";

const VolatileAcidityPage = () => {
  const { language } = useLanguage();
  const { addCalculation } = useCalculationHistory();
  const [naohVolume, setNaohVolume] = useState("");
  const [naohNormality, setNaohNormality] = useState("0.01");
  const [distillateVolume, setDistillateVolume] = useState("100");
  const [sampleVolume, setSampleVolume] = useState("10");
  const [freeSO2, setFreeSO2] = useState("0");
  const [result, setResult] = useState<{ va: number; correctedVa: number } | null>(null);

  const isKa = language === "ka";

  const calculate = () => {
    const vNaOH = parseFloat(naohVolume);
    const normality = parseFloat(naohNormality);
    const vDistillate = parseFloat(distillateVolume);
    const vSample = parseFloat(sampleVolume);
    const so2 = parseFloat(freeSO2) || 0;
    if (isNaN(vNaOH) || isNaN(normality) || isNaN(vDistillate) || isNaN(vSample) || vSample === 0) return;

    // VA (as acetic acid g/L) = (V_NaOH × N × 60 × distillateVolume) / (1000 × sampleVolume)
    // But simplified: VA = (V_NaOH × N × 60) / V_sample (when distillate = sample proportionally)
    // Standard Cash still: VA = (V_NaOH × N × 60 × (vDistillate / vSample)) / vDistillate
    // Simpler: VA (g/L) = (V_NaOH × N × 60) / (vSample / 1000)  -- per liter
    const va = (vNaOH * normality * 60 * 1000) / (vSample * 1000);
    
    // Correct: VA (g/L acetic) = (V_NaOH_mL × N_NaOH × 60) / V_sample_mL
    const vaCalc = (vNaOH * normality * 60) / vSample;

    // SO2 correction: subtract SO2 contribution
    // 1 mg/L free SO2 ≈ 0.015 g/L acetic acid equivalent
    const so2Correction = so2 * 0.015 / 1000 * 60; // negligible but standard
    const correctedVa = Math.max(0, vaCalc - (so2 * 0.00094));

    setResult({
      va: Math.round(vaCalc * 100) / 100,
      correctedVa: Math.round(correctedVa * 100) / 100,
    });

    addCalculation({
      calculator: isKa ? "აქროლადი მჟავიანობა" : "Volatile Acidity",
      inputs: { naohVolume: vNaOH, normality, sampleVolume: vSample, freeSO2: so2 },
      result: `${correctedVa.toFixed(2)} g/L (acetic)`,
    });
    toast.success(isKa ? "შენახულია" : "Saved");
  };

  const clear = () => {
    setNaohVolume("");
    setNaohNormality("0.01");
    setDistillateVolume("100");
    setSampleVolume("10");
    setFreeSO2("0");
    setResult(null);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            {isKa ? "აქროლადი მჟავიანობა" : "Volatile Acidity"}
          </h1>
          <p className="text-muted-foreground">
            {isKa ? "გამოთვალეთ აქროლადი მჟავიანობა (VA) დისტილაციის/ტიტრაციის შედეგებით" : "Calculate volatile acidity (VA) from distillation/titration results"}
          </p>
        </section>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">{isKa ? "VA ტიტრაციის მონაცემები" : "VA Titration Data"}</CardTitle>
            <CardDescription>{isKa ? "Cash still ან ორთქლის დისტილაციის შედეგები" : "Cash still or steam distillation results"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">NaOH {isKa ? "მოცულობა" : "Volume"} (mL)</label>
              <Input type="number" step="0.01" placeholder="5.2" value={naohVolume} onChange={(e) => setNaohVolume(e.target.value)} />
              <p className="text-xs text-muted-foreground">{isKa ? "დისტილატის ტიტრაციაზე დახარჯული NaOH" : "NaOH used to titrate the distillate"}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">NaOH {isKa ? "ნორმალობა" : "Normality"} (N)</label>
              <Input type="number" step="0.001" placeholder="0.01" value={naohNormality} onChange={(e) => setNaohNormality(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{isKa ? "ნიმუშის მოცულობა" : "Sample Volume"} (mL)</label>
              <Input type="number" step="0.1" placeholder="10" value={sampleVolume} onChange={(e) => setSampleVolume(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{isKa ? "თავისუფალი SO₂" : "Free SO₂"} (mg/L) — {isKa ? "არასავალდებულო" : "optional"}</label>
              <Input type="number" step="1" placeholder="0" value={freeSO2} onChange={(e) => setFreeSO2(e.target.value)} />
              <p className="text-xs text-muted-foreground">{isKa ? "SO₂ კორექციისთვის (თუ ცნობილია)" : "For SO₂ correction (if known)"}</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1">{isKa ? "გამოთვლა" : "Calculate"}</Button>
              <Button onClick={clear} variant="outline">{isKa ? "გასუფთავება" : "Clear"}</Button>
            </div>

            {result && (
              <div className="rounded-xl bg-primary/10 p-4 space-y-2 animate-fade-in">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{isKa ? "VA (ძმარმჟავით)" : "VA (as acetic acid)"}</span>
                  <span className="font-bold text-lg text-primary">{result.va} g/L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{isKa ? "SO₂ კორექციით" : "SO₂ corrected"}</span>
                  <span className="font-semibold">{result.correctedVa} g/L</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">{isKa ? "შენიშვნები" : "Notes"}</h3>
          <ul className="space-y-1">
            <li>• {isKa ? "VA ≤ 0.6 გ/ლ — ჯანსაღი ღვინო" : "VA ≤ 0.6 g/L — healthy wine"}</li>
            <li>• {isKa ? "VA 0.6–0.8 გ/ლ — შესამჩნევი, მაგრამ მისაღები" : "VA 0.6–0.8 g/L — noticeable but acceptable"}</li>
            <li>• {isKa ? "VA > 1.2 გ/ლ — ძმრის ხარისხი, წუნდებული" : "VA > 1.2 g/L — vinegar character, faulty"}</li>
            <li>• {isKa ? "EU ლიმიტი: 1.08 გ/ლ (წითელი), 0.9 გ/ლ (თეთრი/ვარდისფერი)" : "EU limit: 1.08 g/L (red), 0.9 g/L (white/rosé)"}</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default VolatileAcidityPage;
