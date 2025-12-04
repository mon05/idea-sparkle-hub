import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConversionCategory, ConversionUnit } from "@/types/calculator";

interface ConversionCalculatorProps {
  category: ConversionCategory;
}

const ConversionCalculator = ({ category }: ConversionCalculatorProps) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [activeUnit, setActiveUnit] = useState<string | null>(null);

  const handleInputChange = (unit: ConversionUnit, inputValue: string) => {
    if (inputValue === "" || inputValue === ".") {
      setValues({ [unit.id]: inputValue });
      setActiveUnit(unit.id);
      return;
    }

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) return;

    setActiveUnit(unit.id);

    // Convert to base unit (mg/L for concentration, mL for volume, mg for mass)
    const baseValue = numValue * unit.factor;

    // Convert from base to all units
    const newValues: Record<string, string> = {};
    category.units.forEach((u) => {
      const converted = baseValue / u.factor;
      newValues[u.id] = u.id === unit.id 
        ? inputValue 
        : formatNumber(converted);
    });

    setValues(newValues);
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return "0";
    if (Math.abs(num) >= 1000000) {
      return num.toExponential(4);
    }
    if (Math.abs(num) < 0.0001) {
      return num.toExponential(4);
    }
    // Remove trailing zeros
    return parseFloat(num.toPrecision(8)).toString();
  };

  const clearAll = () => {
    setValues({});
    setActiveUnit(null);
  };

  return (
    <Card variant="elevated" className="animate-scale-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{category.name} Conversion</CardTitle>
        <button
          onClick={clearAll}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Enter a value in any field to convert to all other units
        </p>
        {category.units.map((unit, index) => (
          <div 
            key={unit.id} 
            className={`animate-fade-in opacity-0 stagger-${Math.min(index + 1, 6)}`}
          >
            <Label htmlFor={unit.id} className="text-sm font-medium mb-1.5 block">
              {unit.name} ({unit.symbol})
            </Label>
            <Input
              id={unit.id}
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={values[unit.id] || ""}
              onChange={(e) => handleInputChange(unit, e.target.value)}
              className={activeUnit === unit.id ? "ring-2 ring-primary" : ""}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ConversionCalculator;
