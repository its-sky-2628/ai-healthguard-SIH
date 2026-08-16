# AI HealthGuard

**Early Detection, Better Tomorrow** — an AI-powered early disease detection and health-risk analysis dashboard prototype.

## Stack

- React 19 + Vite
- Tailwind CSS
- Lucide React (icons)
- Framer Motion (animation)

## Getting started

    npm install
    npm run dev

Then open the printed local URL (typically http://localhost:5173).

To build for production:

    npm run build
    npm run preview

## Structure

    src/
    ├── components/   Sidebar, Header, HeroSection, RiskOverview, StatCard,
    │                 DiseaseRiskChart, QuickHealthScan, HealthAlerts,
    │                 AnalysisModal, PageHeader
    ├── pages/        Dashboard, HealthScan, PredictAnalyze, MedicalHistory,
    │                 Reports, AIInsights, Doctors, Appointments, Settings
    ├── data/         mockData.js -- all mock/demo data in one place
    ├── App.jsx       Layout + client-side page routing (no router dependency)
    └── index.css     Tailwind entry + global styles

## Notes

- All health data, patient names, and risk scores are mock data for demo purposes only.
- Model output is labeled "Model Confidence", not "accuracy" -- this is a prototype, not a clinically validated system.
- File upload, analysis, and report generation flows are simulated with timed UI states (no real backend/model).
