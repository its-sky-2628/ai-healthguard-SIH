import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import RiskOverview from "../components/RiskOverview";
import StatCard from "../components/StatCard";
import DiseaseRiskChart from "../components/DiseaseRiskChart";
import QuickHealthScan from "../components/QuickHealthScan";
import HealthAlerts from "../components/HealthAlerts";
import { kpiCards } from "../data/mockData";

export default function Dashboard({ onStartAnalysis, user }) {
  const firstName =
    user?.name?.trim()?.split(" ")[0] || "Shreyansh";

  return (
    <div className="space-y-6">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-[22px] font-bold text-navy sm:text-[24px]">
          Welcome back, {firstName}! 👋
        </h1>

        <p className="mt-1 text-[13.5px] text-muted">
          Your health is our priority. Let's detect early and stay healthy.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <HeroSection onStartAnalysis={onStartAnalysis} />
        </div>

        <RiskOverview />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((kpi, i) => (
          <StatCard
            key={kpi.label}
            {...kpi}
            delay={0.05 * i}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <DiseaseRiskChart />
        </div>

        <div className="lg:col-span-1">
          <QuickHealthScan />
        </div>

        <div className="lg:col-span-1">
          <HealthAlerts />
        </div>
      </div>
    </div>
  );
}
