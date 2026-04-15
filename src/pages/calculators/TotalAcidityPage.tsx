import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCalculationHistory } from "@/hooks/useCalculationHistory";
import { toast } from "sonner";

const TotalAcidityPage = () => {
  const { language } = useLanguage();
  const { addEntry } = useCalculationHistory();
  const [naohVolume, setNaohVolume] = useState("");
  const [naohNormality, setNaohNormality] = useState("0.1");
  const [sampleVolume, setSampleVolume] = useState("10");
  const [result, setResult] = useState<{ taTartaric: number; taSulfuric: number } | null>(null);

  const isKa = language === "ka";

  const calculate = () => {
    const vNaOH = parseFloat(naohVolume);
    const normality = parseFloat(naohNormality);
    const vSample = parseFloat(sampleVolume);
    if (isNaN(vNaOH) || isNaN(normality) || isNaN(vSample) || vSample === 0) return;

    // TA (as tartaric acid g/L) = (V_NaOH × N × 75) / V_sample
    // 75 = equivalent weight of tartaric acid
    const taTartaric = (vNaOH * normality * 75) / vSample;
    // TA (as sulfuric acid g/L) = (V_NaOH × N × 49) / V_sample
    const taSulfuric = (vNaOH * normality * 49) / vSample;

    setResult({
      taTartaric: Math.round(taTartaric * 100) / 100,
      taSulfuric: Math.round(taSulfuric * 100) / 100,
    });

    addEntry({
      calculator: isKa ? "საერთო მჟავიანობა" : "Total Acidity",
      inputs: { naohVolume: vNaOH, normality, sampleVolume: vSample },
      result: `${taTartaric.toFixed(2)} g/L (tartaric)`,
    });
    toast.success(isKa ? "შენახულია" : "Saved");
  };

  const clear = () => {
    setNaohVolume("");
    setNaohNormality("0.1");
    setSampleVolume("10");
    setResult(null);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            {isKa ? "საერთო მჟავიანობა" : "Total Acidity"}
          </h1>
          <p className="text-muted-foreground">
            {isKa ? "გამოთვალეთ საერთო მჟავიანობა ტიტრაციის შედეგებით" : "Calculate total acidity from titration results"}
          </p>
        </section>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">{isKa ? "ტიტრაციის მონაცემები" : "Titration Data"}</CardTitle>
            <CardDescription>{isKa ? "შეიყვანეთ ტიტრაციის პარამეტრები" : "Enter titration parameters"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">NaOH {isKa ? "მოცულობა" : "Volume"} (mL)</label>
              <Input type="number" step="0.01" placeholder="7.5" value={naohVolume} onChange={(e) => setNaohVolume(e.target.value)} />
              <p className="text-xs text-muted-foreground">{isKa ? "დახარჯული NaOH მოცულობა" : "Volume of NaOH used in titration"}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">NaOH {isKa ? "ნორმალობა" : "Normality"} (N)</label>
              <Input type="number" step="0.01" placeholder="0.1" value={naohNormality} onChange={(e) => setNaohNormality(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{isKa ? "ნიმუშის მოცულობა" : "Sample Volume"} (mL)</label>
              <Input type="number" step="0.1" placeholder="10" value={sampleVolume} onChange={(e) => setSampleVolume(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1">{isKa ? "გამოთვლა" : "Calculate"}</Button>
              <Button onClick={clear} variant="outline">{isKa ? "გასუფთავება" : "Clear"}</Button>
            </div>

            {result && (
              <div className="rounded-xl bg-primary/10 p-4 space-y-2 animate-fade-in">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{isKa ? "ღვინის მჟავით" : "As tartaric acid"}</span>
                  <span className="font-bold text-lg text-primary">{result.taTartaric} g/L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{isKa ? "გოგირდმჟავით" : "As sulfuric acid"}</span>
                  <span className="font-semibold">{result.taSulfuric} g/L</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">{isKa ? "შენიშვნები" : "Notes"}</h3>
          <ul className="space-y-1">
            <li>• {isKa ? "ტიტრაცია pH 8.2-მდე ფენოლფთალეინის ინდიკატორით" : "Titrate to pH 8.2 endpoint with phenolphthalein indicator"}</li>
            <li>• {isKa ? "ღვინის მჟავის ექვ. წონა = 75, გოგირდმჟავის = 49" : "Tartaric acid eq. weight = 75, sulfuric acid = 49"}</li>
            <li>• {isKa ? "ტიპური TA ღვინოში: 5-8 გ/ლ (ღვინის მჟავით)" : "Typical wine TA: 5-8 g/L (as tartaric)"}</li>
            <li>• {isKa ? "CO₂ გააცილეთ ნიმუშს ტიტრაციამდე" : "Degas sample before titration to remove CO₂"}</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default TotalAcidityPage;
