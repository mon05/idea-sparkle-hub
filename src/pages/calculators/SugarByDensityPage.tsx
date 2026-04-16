import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCalculationHistory } from "@/hooks/useCalculationHistory";
import { toast } from "sonner";

const SugarByDensityPage = () => {
  const { language } = useLanguage();
  const { addEntry } = useCalculationHistory();
  const [temperature, setTemperature] = useState("");
  const [density, setDensity] = useState("");
  const [result, setResult] = useState<{ sugar: number; correctedDensity: number; potentialAlcohol: number } | null>(null);

  const isKa = language === "ka";

  const title = isKa ? "შაქარი სიმკვრივით" : "Sugar by Density";
  const description = isKa
    ? "გამოთვალეთ შაქრის დონე სიმკვრივისა და ტემპერატურის მიხედვით ალკოჰოლური დუღილის დროს"
    : "Calculate sugar level from density and temperature during alcoholic fermentation";

  const calculate = () => {
    const temp = parseFloat(temperature);
    const densGL = parseFloat(density);
    if (isNaN(temp) || isNaN(densGL)) return;

    // Convert g/L to g/mL for calculation
    const dens = densGL / 1000;

    // Temperature correction for density (reference 20°C)
    const correctedDensity = dens + (temp - 20) * 0.0002;
    const correctedDensityGL = Math.round(correctedDensity * 10000) / 10;

    // Sugar estimation: sugar (g/L) ≈ (corrected_density - 1.0) * 2600
    const sugarGL = (correctedDensity - 1.0) * 2600;
    const sugar = Math.max(0, Math.round(sugarGL * 10) / 10);

    // Potential alcohol ≈ sugar / 16.83
    const potentialAlcohol = Math.round((sugar / 16.83) * 100) / 100;

    setResult({ sugar, correctedDensity: correctedDensityGL, potentialAlcohol });

    addEntry({
      calculatorId: "sugar-by-density",
      calculatorName: isKa ? "შაქარი სიმკვრივით" : "Sugar by Density",
      inputs: { temperature: temp, density: densGL },
      result: sugar,
      unit: "g/L",
      details: `${sugar.toFixed(1)} g/L sugar, ${potentialAlcohol.toFixed(2)}% potential alcohol`,
    });

    toast.success(isKa ? "შენახულია" : "Saved");
  };

  const clear = () => {
    setTemperature("");
    setDensity("");
    setResult(null);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-lg mx-auto">
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </section>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">{isKa ? "პარამეტრები" : "Parameters"}</CardTitle>
            <CardDescription>{isKa ? "შეიყვანეთ ტემპერატურა და სიმკვრივე" : "Enter temperature and density reading"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{isKa ? "ტემპერატურა" : "Temperature"} (°C)</label>
              <Input
                type="number"
                step="0.1"
                placeholder="20"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{isKa ? "ტვირთის ტემპერატურა გაზომვისას" : "Must temperature at measurement time"}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{isKa ? "სიმკვრივე" : "Density"} (g/L)</label>
              <Input
                type="number"
                step="0.1"
                placeholder="1085"
                value={density}
                onChange={(e) => setDensity(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{isKa ? "ჰიდრომეტრით ან რეფრაქტომეტრით გაზომილი" : "Measured by hydrometer or refractometer"}</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1">{isKa ? "გამოთვლა" : "Calculate"}</Button>
              <Button onClick={clear} variant="outline">{isKa ? "გასუფთავება" : "Clear"}</Button>
            </div>

            {result && (
              <div className="rounded-xl bg-primary/10 p-4 space-y-2 animate-fade-in">
                <div className="flex justify-between">
                   <span className="text-sm text-muted-foreground">{isKa ? "კორექტირებული სიმკვრივე (20°C)" : "Corrected density (20°C)"}</span>
                   <span className="font-semibold">{result.correctedDensity} g/L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{isKa ? "შაქრის დონე" : "Sugar level"}</span>
                  <span className="font-bold text-lg text-primary">{result.sugar} g/L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{isKa ? "პოტენციური ალკოჰოლი" : "Potential alcohol"}</span>
                  <span className="font-semibold">{result.potentialAlcohol}% vol</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground animate-fade-in">
          <h3 className="font-semibold text-foreground mb-2">{isKa ? "შენიშვნები" : "Notes"}</h3>
          <ul className="space-y-1">
             <li>• {isKa ? "სიმკვრივე კალიბრებულია 20°C-ზე; ტემპერატურის კორექცია ხდება ავტომატურად" : "Density is calibrated at 20°C; temperature correction is applied automatically"}</li>
            <li>• {isKa ? "1000 გ/ლ სიმკვრივე = მშრალი ღვინო (შაქრის გარეშე)" : "Density of 1000 g/L = dry wine (no residual sugar)"}</li>
            <li>• {isKa ? "ფორმულა: შაქარი ≈ (სიმკვრივე/1000 - 1.0) × 2600 გ/ლ" : "Formula: sugar ≈ (density/1000 - 1.0) × 2600 g/L"}</li>
            <li>• {isKa ? "პოტენციური ალკოჰოლი ≈ შაქარი / 16.83" : "Potential alcohol ≈ sugar / 16.83"}</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default SugarByDensityPage;
