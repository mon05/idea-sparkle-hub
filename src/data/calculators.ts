import { CalculatorCategory, ConversionCategory } from "@/types/calculator";

export const calculatorCategories: CalculatorCategory[] = [
  {
    id: "acids",
    name: "Acid Additions",
    description: "Calculate acid additions for wine adjustments",
    icon: "🧪",
    calculators: [
      { id: "citric", name: "Citric Acid", description: "Calculate citric acid additions", path: "/calculator/citric-acid" },
      { id: "malic", name: "Malic Acid", description: "Calculate malic acid additions", path: "/calculator/malic-acid" },
      { id: "tartaric", name: "Tartaric Acid", description: "Calculate tartaric acid additions", path: "/calculator/tartaric-acid" },
      { id: "deacidification", name: "Deacidification", description: "Calculate deacidification requirements", path: "/calculator/deacidification" },
    ],
  },
  {
    id: "fining",
    name: "Fining Agents",
    description: "Calculate fining agent additions",
    icon: "✨",
    calculators: [
      { id: "bentonite", name: "Bentonite", description: "Calculate bentonite additions", path: "/calculator/bentonite" },
      { id: "carbon", name: "Carbon", description: "Calculate activated carbon additions", path: "/calculator/carbon" },
      { id: "pvpp", name: "PVPP", description: "Calculate PVPP additions", path: "/calculator/pvpp" },
      { id: "tannin", name: "Tannin", description: "Calculate tannin additions", path: "/calculator/tannin" },
      { id: "fining-trial", name: "Fining Trial", description: "Calculate fining trial bench tests", path: "/calculator/fining-trial" },
    ],
  },
  {
    id: "sulfur",
    name: "Sulfur Management",
    description: "Manage SO2 levels in wine",
    icon: "🔬",
    calculators: [
      { id: "pms", name: "PMS Addition", description: "Calculate potassium metabisulfite additions", path: "/calculator/pms" },
      { id: "copper-sulfate", name: "Copper Sulfate", description: "Remove excessive SO2", path: "/calculator/copper-sulfate" },
      { id: "hydrogen-peroxide", name: "Hydrogen Peroxide", description: "Decrease SO2 with H2O2", path: "/calculator/hydrogen-peroxide" },
    ],
  },
  {
    id: "sugar",
    name: "Sugar Adjustments",
    description: "Sugar additions for chaptalization",
    icon: "🍬",
    calculators: [
      { id: "sugar-adjustment", name: "Sugar Adjustment", description: "Calculate sugar additions for Brix increase", path: "/calculator/sugar-adjustment" },
    ],
  },
  {
    id: "nutrients",
    name: "Nutrients & Stabilizers",
    description: "Yeast nutrients and stabilizers",
    icon: "🍇",
    calculators: [
      { id: "dap", name: "DAP Addition", description: "Calculate diammonium phosphate additions", path: "/calculator/dap" },
      { id: "sorbic-acid", name: "Sorbic Acid", description: "Calculate sorbic acid for stabilization", path: "/calculator/sorbic-acid" },
    ],
  },
  {
    id: "alcohol",
    name: "Alcohol Adjustments",
    description: "Alcohol additions and dilutions",
    icon: "🍷",
    calculators: [
      { id: "alcohol-addition", name: "Alcohol Addition", description: "Calculate spirit additions", path: "/calculator/alcohol-addition" },
      { id: "alcohol-dilution", name: "Alcohol Dilution", description: "Calculate water dilution for alcohol", path: "/calculator/alcohol-dilution" },
    ],
  },
  {
    id: "conversions",
    name: "Unit Conversions",
    description: "General conversion calculators",
    icon: "📐",
    calculators: [
      { id: "concentration", name: "Concentration", description: "Convert between concentration units", path: "/conversions/concentration" },
      { id: "volume", name: "Volume", description: "Convert between volume units", path: "/conversions/volume" },
      { id: "mass", name: "Mass", description: "Convert between mass units", path: "/conversions/mass" },
    ],
  },
];

export const conversionCategories: ConversionCategory[] = [
  {
    id: "concentration",
    name: "Concentration",
    units: [
      { id: "percent", name: "Percentage", symbol: "%", factor: 10000 },
      { id: "g_l", name: "Grams per litre", symbol: "g/L", factor: 1000 },
      { id: "mg_l", name: "Milligrams per litre", symbol: "mg/L", factor: 1 },
      { id: "ug_l", name: "Micrograms per litre", symbol: "µg/L", factor: 0.001 },
      { id: "ng_l", name: "Nanograms per litre", symbol: "ng/L", factor: 0.000001 },
    ],
  },
  {
    id: "volume",
    name: "Volume",
    units: [
      { id: "kl", name: "Kilolitres", symbol: "kL", factor: 1000000 },
      { id: "hl", name: "Hectolitres", symbol: "hL", factor: 100000 },
      { id: "l", name: "Litres", symbol: "L", factor: 1000 },
      { id: "cl", name: "Centilitres", symbol: "cL", factor: 10 },
      { id: "ml", name: "Millilitres", symbol: "mL", factor: 1 },
      { id: "ul", name: "Microlitres", symbol: "µL", factor: 0.001 },
      { id: "nl", name: "Nanolitres", symbol: "nL", factor: 0.000001 },
    ],
  },
  {
    id: "mass",
    name: "Mass",
    units: [
      { id: "t", name: "Tonnes", symbol: "T", factor: 1000000000 },
      { id: "kg", name: "Kilograms", symbol: "kg", factor: 1000000 },
      { id: "g", name: "Grams", symbol: "g", factor: 1000 },
      { id: "mg", name: "Milligrams", symbol: "mg", factor: 1 },
      { id: "ug", name: "Micrograms", symbol: "µg", factor: 0.001 },
      { id: "ng", name: "Nanograms", symbol: "ng", factor: 0.000001 },
    ],
  },
];
