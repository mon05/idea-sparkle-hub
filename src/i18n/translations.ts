export type Language = 'en' | 'ka';

export const translations = {
  en: {
    // Header
    appName: "WineCalc",
    
    // Hero
    heroTitle: "Winemaking Calculator",
    heroDescription: "Professional calculations for acid additions, fining agents, sulfur management, and more.",
    
    // Quick Tips
    quickTips: "Quick Tips",
    tip1: "Always conduct bench trials before making large batch adjustments",
    tip2: "Record all additions in your cellar log for traceability",
    tip3: "Double-check calculations before adding any chemicals",
    
    // Categories
    categories: {
      acids: {
        name: "Acid Additions",
        description: "Calculate acid additions for wine adjustments",
      },
      fining: {
        name: "Fining Agents",
        description: "Calculate fining agent additions",
      },
      sulfur: {
        name: "Sulfur Management",
        description: "Manage SO2 levels in wine",
      },
      nutrients: {
        name: "Nutrients & Stabilizers",
        description: "Yeast nutrients and stabilizers",
      },
      alcohol: {
        name: "Alcohol Adjustments",
        description: "Alcohol additions and dilutions",
      },
      conversions: {
        name: "Unit Conversions",
        description: "General conversion calculators",
      },
    },
    
    // Calculators
    calculators: {
      citric: { name: "Citric Acid", description: "Calculate citric acid additions" },
      malic: { name: "Malic Acid", description: "Calculate malic acid additions" },
      tartaric: { name: "Tartaric Acid", description: "Calculate tartaric acid additions" },
      deacidification: { name: "Deacidification", description: "Calculate deacidification requirements" },
      bentonite: { name: "Bentonite", description: "Calculate bentonite additions" },
      carbon: { name: "Carbon", description: "Calculate activated carbon additions" },
      pvpp: { name: "PVPP", description: "Calculate PVPP additions" },
      tannin: { name: "Tannin", description: "Calculate tannin additions" },
      "fining-trial": { name: "Fining Trial", description: "Calculate fining trial bench tests" },
      pms: { name: "PMS Addition", description: "Calculate potassium metabisulfite additions" },
      "copper-sulfate": { name: "Copper Sulfate", description: "Remove excessive SO2" },
      "hydrogen-peroxide": { name: "Hydrogen Peroxide", description: "Decrease SO2 with H2O2" },
      dap: { name: "DAP Addition", description: "Calculate diammonium phosphate additions" },
      "sorbic-acid": { name: "Sorbic Acid", description: "Calculate sorbic acid for stabilization" },
      "alcohol-addition": { name: "Alcohol Addition", description: "Calculate spirit additions" },
      "alcohol-dilution": { name: "Alcohol Dilution", description: "Calculate water dilution for alcohol" },
      concentration: { 
        name: "Concentration", 
        description: "Convert between concentration units",
        pageTitle: "Concentration Converter",
        pageDescription: "Convert between different concentration units commonly used in winemaking."
      },
      volume: { 
        name: "Volume", 
        description: "Convert between volume units",
        pageTitle: "Volume Converter",
        pageDescription: "Convert between volume units from nanolitres to kilolitres."
      },
      mass: { 
        name: "Mass", 
        description: "Convert between mass units",
        pageTitle: "Mass Converter",
        pageDescription: "Convert between mass units from nanograms to tonnes."
      },
    },
    
    // Conversion common
    conversionTitle: "Conversion",
    enterValueHint: "Enter a value in any field to convert to all other units",
    
    // Common
    calculate: "Calculate",
    result: "Result",
    volume: "Volume",
    wineVolume: "Wine Volume (L)",
    targetAddition: "Target Addition (mg/L)",
    currentLevel: "Current Level",
    desiredLevel: "Desired Level",
    required: "Required",
    footer: "WineCalc — Professional Winemaking Calculator",
    calculatorsCount: "calculators",
    clear: "Clear",
    saved: "Saved",
    savedToHistory: "Calculation saved to history",
    calculationHistory: "Calculation History",
    noCalculations: "No calculations yet",
    clearAll: "Clear All",
    confirmClear: "Are you sure you want to clear all history?",
    cancel: "Cancel",
    delete: "Delete",
    wineExpert: "Wine Expert",
    wineExpertWelcome: "Hello! I'm your winemaking expert. Ask me anything about wine production, chemistry, or best practices.",
    askWinemaking: "Ask a winemaking question...",
    error: "Error",
    failedResponse: "Failed to get response",
    
    // Conversion units
    units: {
      concentration: {
        percent: "Percentage",
        g_l: "Grams per litre",
        mg_l: "Milligrams per litre",
        ug_l: "Micrograms per litre",
        ng_l: "Nanograms per litre",
      },
      volume: {
        kl: "Kilolitres",
        hl: "Hectolitres",
        l: "Litres",
        cl: "Centilitres",
        ml: "Millilitres",
        ul: "Microlitres",
        nl: "Nanolitres",
      },
      mass: {
        t: "Tonnes",
        kg: "Kilograms",
        g: "Grams",
        mg: "Milligrams",
        ug: "Micrograms",
        ng: "Nanograms",
      },
    },
  },
  ka: {
    // Header
    appName: "WineCalc",
    
    // Hero
    heroTitle: "მეღვინეობის კალკულატორი",
    heroDescription: "პროფესიონალური გამოთვლები მჟავების დამატებისთვის, დამწმენდი (გამწებავი) აგენტებისთვის, გოგირდის მართვისთვის და სხვა.",
    
    // Quick Tips
    quickTips: "სწრაფი რჩევები",
    tip1: "ყოველთვის ჩაატარეთ საცდელი ტესტები დიდი პარტიების კორექტირებამდე",
    tip2: "ჩაწერეთ ყველა დამატება მარნის ჟურნალში მიკვლევადობისთვის",
    tip3: "ორმაგად შეამოწმეთ გამოთვლები ქიმიკატების დამატებამდე",
    
    // Categories
    categories: {
      acids: {
        name: "მჟავების კორექტირება",
        description: "გამოთვალეთ მჟავების დამატება ღვინოს კორექტირებისთვის",
      },
      fining: {
        name: "დამწმენდი (გამწებავი) აგენტები",
        description: "გამოთვალეთ დამწმენდი (გამწებავი) აგენტების დამატება",
      },
      sulfur: {
        name: "გოგირდის მართვა",
        description: "მართეთ SO2 დონეები ღვინოში",
      },
      nutrients: {
        name: "საფუარის საკვები ნივთიერებები & სტაბილიზატორები",
        description: "საფუარის საკვები და სტაბილიზატორები",
      },
      alcohol: {
        name: "ალკოჰოლის კორექტირება",
        description: "ალკოჰოლის დამატება და განზავება",
      },
      conversions: {
        name: "ერთეულების კონვერტაცია",
        description: "ზოგადი კონვერტაციის კალკულატორები",
      },
    },
    
    // Calculators
    calculators: {
      citric: { name: "ლიმონმჟავა", description: "გამოთვალეთ ლიმონმჟავას დამატება" },
      malic: { name: "ვაშლის მჟავა", description: "გამოთვალეთ ვაშლის მჟავას დამატება" },
      tartaric: { name: "ღვინის მჟავა", description: "გამოთვალეთ ღვინის მჟავას დამატება" },
      deacidification: { name: "დეაციდიფიკაცია", description: "დეაციდიფიკაციის გამოთვლა" },
      bentonite: { name: "ბენტონიტი", description: "გამოთვალეთ ბენტონიტის დამატება" },
      carbon: { name: "აქტივირებული ნახშირი", description: "გამოთვალეთ აქტივირებული ნახშირის დამატება" },
      pvpp: { name: "PVPP", description: "გამოთვალეთ PVPP-ს დაოზირება" },
      tannin: { name: "ტანინი", description: "გამოთვალეთ ტანინის დამატება" },
      "fining-trial": { name: "დამწმენდი (გამწებავი) ტესტი", description: "გამოთვალეთ დამწმენდი (გამწებავის) საცდელი ტესტები" },
      pms: { name: "PMS დამატება", description: "გამოთვალეთ კალიუმის მეტაბისულფიტის დამატება" },
      "copper-sulfate": { name: "სპილენძის სულფატი", description: "მოაცილეთ ზედმეტი SO2" },
      "hydrogen-peroxide": { name: "წყალბადის ზეჟანგი", description: "შეამცირეთ SO2 H2O2-ით" },
      dap: { name: "DAP დამატება", description: "გამოთვალეთ დიამონიუმ ფოსფატის დამატება" },
      "sorbic-acid": { name: "სორბინმჟავა", description: "გამოთვალეთ სორბინმჟავა სტაბილიზაციისთვის" },
      "alcohol-addition": { name: "ალკოჰოლის დამატება", description: "გამოთვალეთ სპირტის დამატება" },
      "alcohol-dilution": { name: "ალკოჰოლის განზავება", description: "გამოთვალეთ წყლით განზავება ალკოჰოლისთვის" },
      concentration: { 
        name: "კონცენტრაცია", 
        description: "კონვერტაცია კონცენტრაციის ერთეულებს შორის",
        pageTitle: "კონცენტრაციის კონვერტორი",
        pageDescription: "კონვერტაცია სხვადასხვა კონცენტრაციის ერთეულებს შორის, რომლებიც გამოიყენება მეღვინეობაში."
      },
      volume: { 
        name: "მოცულობა", 
        description: "კონვერტაცია მოცულობის ერთეულებს შორის",
        pageTitle: "მოცულობის კონვერტორი",
        pageDescription: "კონვერტაცია მოცულობის ერთეულებს შორის ნანოლიტრიდან კილოლიტრამდე."
      },
      mass: { 
        name: "მასა", 
        description: "კონვერტაცია მასის ერთეულებს შორის",
        pageTitle: "მასის კონვერტორი",
        pageDescription: "კონვერტაცია მასის ერთეულებს შორის ნანოგრამიდან ტონამდე."
      },
    },
    
    // Conversion common
    conversionTitle: "კონვერტაცია",
    enterValueHint: "შეიყვანეთ მნიშვნელობა ნებისმიერ ველში სხვა ერთეულებში გადასაყვანად",
    
    // Common
    calculate: "გამოთვლა",
    result: "შედეგი",
    volume: "მოცულობა",
    wineVolume: "ღვინის მოცულობა (ლ)",
    targetAddition: "სამიზნე დამატება (მგ/ლ)",
    currentLevel: "მიმდინარე დონე",
    desiredLevel: "სასურველი დონე",
    required: "საჭირო",
    footer: "WineCalc — პროფესიონალური მეღვინეობის კალკულატორი",
    calculatorsCount: "კალკულატორი",
    clear: "გასუფთავება",
    saved: "შენახულია",
    savedToHistory: "გამოთვლა ისტორიაში შენახულია",
    calculationHistory: "გამოთვლების ისტორია",
    noCalculations: "ისტორია ცარიელია",
    clearAll: "ყველას წაშლა",
    confirmClear: "ნამდვილად გსურთ მთელი ისტორიის წაშლა?",
    cancel: "გაუქმება",
    delete: "წაშლა",
    wineExpert: "ღვინის ექსპერტი",
    wineExpertWelcome: "გამარჯობა! მე ვარ თქვენი მეღვინეობის ექსპერტი. დამისვით ნებისმიერი კითხვა ღვინის დამზადების შესახებ.",
    askWinemaking: "დასვით კითხვა მეღვინეობაზე...",
    error: "შეცდომა",
    failedResponse: "ვერ მოხერხდა პასუხის მიღება",
    
    // Conversion units
    units: {
      concentration: {
        percent: "პროცენტი",
        g_l: "გრამი ლიტრზე",
        mg_l: "მილიგრამი ლიტრზე",
        ug_l: "მიკროგრამი ლიტრზე",
        ng_l: "ნანოგრამი ლიტრზე",
      },
      volume: {
        kl: "კილოლიტრი",
        hl: "ჰექტოლიტრი",
        l: "ლიტრი",
        cl: "ცენტილიტრი",
        ml: "მილილიტრი",
        ul: "მიკროლიტრი",
        nl: "ნანოლიტრი",
      },
      mass: {
        t: "ტონა",
        kg: "კილოგრამი",
        g: "გრამი",
        mg: "მილიგრამი",
        ug: "მიკროგრამი",
        ng: "ნანოგრამი",
      },
    },
  },
};

export type TranslationKey = keyof typeof translations.en;
