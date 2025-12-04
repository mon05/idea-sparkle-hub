import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";

// Conversion pages
import ConcentrationPage from "./pages/conversions/ConcentrationPage";
import VolumePage from "./pages/conversions/VolumePage";
import MassPage from "./pages/conversions/MassPage";

// Calculator pages
import TartaricAcidPage from "./pages/calculators/TartaricAcidPage";
import CitricAcidPage from "./pages/calculators/CitricAcidPage";
import MalicAcidPage from "./pages/calculators/MalicAcidPage";
import BentonitePage from "./pages/calculators/BentonitePage";
import PMSPage from "./pages/calculators/PMSPage";
import DAPPage from "./pages/calculators/DAPPage";
import AlcoholAdditionPage from "./pages/calculators/AlcoholAdditionPage";
import AlcoholDilutionPage from "./pages/calculators/AlcoholDilutionPage";
import SorbicAcidPage from "./pages/calculators/SorbicAcidPage";
import CarbonPage from "./pages/calculators/CarbonPage";
import PVPPPage from "./pages/calculators/PVPPPage";
import TanninPage from "./pages/calculators/TanninPage";
import CopperSulfatePage from "./pages/calculators/CopperSulfatePage";
import HydrogenPeroxidePage from "./pages/calculators/HydrogenPeroxidePage";
import DeacidificationPage from "./pages/calculators/DeacidificationPage";
import FiningTrialPage from "./pages/calculators/FiningTrialPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          
          {/* Conversion Routes */}
          <Route path="/conversions/concentration" element={<ConcentrationPage />} />
          <Route path="/conversions/volume" element={<VolumePage />} />
          <Route path="/conversions/mass" element={<MassPage />} />
          
          {/* Acid Calculators */}
          <Route path="/calculator/tartaric-acid" element={<TartaricAcidPage />} />
          <Route path="/calculator/citric-acid" element={<CitricAcidPage />} />
          <Route path="/calculator/malic-acid" element={<MalicAcidPage />} />
          <Route path="/calculator/deacidification" element={<DeacidificationPage />} />
          
          {/* Fining Calculators */}
          <Route path="/calculator/bentonite" element={<BentonitePage />} />
          <Route path="/calculator/carbon" element={<CarbonPage />} />
          <Route path="/calculator/pvpp" element={<PVPPPage />} />
          <Route path="/calculator/tannin" element={<TanninPage />} />
          <Route path="/calculator/fining-trial" element={<FiningTrialPage />} />
          
          {/* Sulfur Management */}
          <Route path="/calculator/pms" element={<PMSPage />} />
          <Route path="/calculator/copper-sulfate" element={<CopperSulfatePage />} />
          <Route path="/calculator/hydrogen-peroxide" element={<HydrogenPeroxidePage />} />
          
          {/* Nutrients & Stabilizers */}
          <Route path="/calculator/dap" element={<DAPPage />} />
          <Route path="/calculator/sorbic-acid" element={<SorbicAcidPage />} />
          
          {/* Alcohol Adjustments */}
          <Route path="/calculator/alcohol-addition" element={<AlcoholAdditionPage />} />
          <Route path="/calculator/alcohol-dilution" element={<AlcoholDilutionPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
