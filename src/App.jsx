import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AnalysisModal from "./components/AnalysisModal";
import Dashboard from "./pages/Dashboard";
import HealthScan from "./pages/HealthScan";
import PredictAnalyze from "./pages/PredictAnalyze";
import MedicalHistory from "./pages/MedicalHistory";
import Reports from "./pages/Reports";
import AIInsights from "./pages/AIInsights";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Settings from "./pages/Settings";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openAnalysis = () => setModalOpen(true);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard onStartAnalysis={openAnalysis} />;
      case "health-scan":
        return <HealthScan />;
      case "predict-analyze":
        return <PredictAnalyze onStartAnalysis={openAnalysis} />;
      case "medical-history":
        return <MedicalHistory />;
      case "reports":
        return <Reports />;
      case "ai-insights":
        return <AIInsights />;
      case "doctors":
        return <Doctors />;
      case "appointments":
        return <Appointments />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard onStartAnalysis={openAnalysis} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-bg font-sans text-navy">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-h-screen w-full flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <AnalysisModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
