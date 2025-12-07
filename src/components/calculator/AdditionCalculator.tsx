import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Check } from "lucide-react";
import { useCalculationHistory } from "@/hooks/useCalculationHistory";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";

interface AdditionField {
  id: string;
  label: string;
  unit: string;
  placeholder?: string;
  helpText?: string;
}

interface AdditionCalculatorProps {
  title: string;
  description: string;
  fields: AdditionField[];
  calculate: (values: Record<string, number>) => { result: number; unit: string; details?: string };
  resultLabel?: string;
  calculatorId?: string;
}

const AdditionCalculator = ({
  title,
  description,
  fields,
  calculate,
  resultLabel = "Amount needed",
  calculatorId,
}: AdditionCalculatorProps) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ result: number; unit: string; details?: string } | null>(null);
  const [saved, setSaved] = useState(false);
  const { addEntry } = useCalculationHistory();
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleInputChange = (fieldId: string, value: string) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    setResult(null);
    setSaved(false);
  };

  const handleCalculate = () => {
    const numericValues: Record<string, number> = {};
    for (const field of fields) {
      const value = parseFloat(values[field.id] || "0");
      if (isNaN(value)) {
        return;
      }
      numericValues[field.id] = value;
    }
    const calculationResult = calculate(numericValues);
    setResult(calculationResult);
    setSaved(false);

    // Auto-save to history
    addEntry({
      calculatorId: calculatorId || title.toLowerCase().replace(/\s+/g, '-'),
      calculatorName: title,
      inputs: numericValues,
      result: calculationResult.result,
      unit: calculationResult.unit,
      details: calculationResult.details,
    });
    setSaved(true);
    
    toast({
      title: language === 'ka' ? "შენახულია" : "Saved",
      description: language === 'ka' ? "გამოთვლა ისტორიაში შენახულია" : "Calculation saved to history",
    });
  };

  const handleClear = () => {
    setValues({});
    setResult(null);
    setSaved(false);
  };

  const formatResult = (num: number): string => {
    if (num === 0) return "0";
    if (Math.abs(num) >= 10000) {
      return num.toFixed(0);
    }
    if (Math.abs(num) >= 100) {
      return num.toFixed(1);
    }
    if (Math.abs(num) >= 1) {
      return num.toFixed(2);
    }
    return num.toFixed(4);
  };

  return (
    <Card variant="elevated" className="animate-scale-in">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div 
            key={field.id} 
            className={`animate-fade-in opacity-0 stagger-${Math.min(index + 1, 6)}`}
          >
            <Label htmlFor={field.id} className="text-sm font-medium mb-1.5 block">
              {field.label}
              <span className="text-muted-foreground ml-1">({field.unit})</span>
            </Label>
            <Input
              id={field.id}
              type="text"
              inputMode="decimal"
              placeholder={field.placeholder || "0"}
              value={values[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            />
            {field.helpText && (
              <p className="text-xs text-muted-foreground mt-1">{field.helpText}</p>
            )}
          </div>
        ))}

        {result && (
          <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20 animate-scale-in">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground mb-1">{resultLabel}</p>
              {saved && (
                <span className="text-xs text-primary flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  {language === 'ka' ? 'შენახულია' : 'Saved'}
                </span>
              )}
            </div>
            <p className="text-2xl font-display font-bold text-primary">
              {formatResult(result.result)} <span className="text-lg">{result.unit}</span>
            </p>
            {result.details && (
              <p className="text-sm text-muted-foreground mt-2">{result.details}</p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button variant="wine" className="flex-1" onClick={handleCalculate}>
          <Calculator className="h-4 w-4 mr-2" />
          {language === 'ka' ? 'გამოთვლა' : 'Calculate'}
        </Button>
        <Button variant="outline" onClick={handleClear}>
          {language === 'ka' ? 'გასუფთავება' : 'Clear'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdditionCalculator;
