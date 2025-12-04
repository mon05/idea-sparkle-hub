export interface CalculatorCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  calculators: Calculator[];
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  path: string;
}

export interface ConversionUnit {
  id: string;
  name: string;
  symbol: string;
  factor: number;
}

export interface ConversionCategory {
  id: string;
  name: string;
  units: ConversionUnit[];
}
