import {
  LayoutDashboard,
  ScanLine,
  Brain,
  FileClock,
  FileText,
  Sparkles,
  Stethoscope,
  CalendarDays,
  Settings as SettingsIcon,
  HeartPulse,
  Users,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

export const navGroups = [
  {
    label: "Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "health-scan", label: "Health Scan", icon: ScanLine },
      { id: "predict-analyze", label: "Predict & Analyze", icon: Brain },
      { id: "medical-history", label: "Medical History", icon: FileClock },
      { id: "reports", label: "Reports", icon: FileText },
    ],
  },
  {
    label: "Insights",
    items: [
      { id: "ai-insights", label: "AI Insights", icon: Sparkles },
      { id: "doctors", label: "Doctors", icon: Stethoscope },
      { id: "appointments", label: "Appointments", icon: CalendarDays },
    ],
  },
];

export const bottomNavItem = { id: "settings", label: "Settings", icon: SettingsIcon };

export const pageMeta = {
  dashboard: { title: "Dashboard", subtitle: "Your health overview at a glance." },
  "health-scan": { title: "Health Scan", subtitle: "Upload and manage your medical scans and reports." },
  "predict-analyze": { title: "Predict & Analyze", subtitle: "Run AI-assisted predictive analysis on your health data." },
  "medical-history": { title: "Medical History", subtitle: "A complete timeline of your health records." },
  reports: { title: "Reports", subtitle: "All generated analysis reports in one place." },
  "ai-insights": { title: "AI Insights", subtitle: "Trends and patterns detected across your health data." },
  doctors: { title: "Doctors", subtitle: "Specialists connected to your care team." },
  appointments: { title: "Appointments", subtitle: "Upcoming and past consultations." },
  settings: { title: "Settings", subtitle: "Manage your account and preferences." },
};

export const kpiCards = [
  { label: "Total Analyses", value: 128, delta: "+12%", direction: "up", suffix: "", icon: ScanLine },
  { label: "Patients Monitored", value: 96, delta: "+15%", direction: "up", suffix: "", icon: Users },
  { label: "High-Risk Cases", value: 7, delta: "-18%", direction: "down", suffix: "", icon: AlertTriangle, padZero: true },
  { label: "Model Confidence", value: 94.7, delta: "+5%", direction: "up", suffix: "%", icon: ShieldCheck },
];

export const diseaseRisks = [
  { name: "Heart Disease", level: "Low" },
  { name: "Diabetes", level: "Low" },
  { name: "Lung Disease", level: "Moderate" },
  { name: "Liver Disease", level: "Low" },
];

export const diseaseDistribution = [
  { name: "Heart Disease", value: 68 },
  { name: "Diabetes", value: 52 },
  { name: "Lung Disease", value: 31 },
  { name: "Liver Disease", value: 18 },
];

export const healthAlerts = [
  {
    id: 1,
    title: "Vitamin D Deficiency",
    detail: "Potential deficiency detected",
    time: "2h ago",
    level: "warning",
  },
  {
    id: 2,
    title: "Irregular Heart Rate",
    detail: "Requires further evaluation",
    time: "5h ago",
    level: "danger",
  },
  {
    id: 3,
    title: "Blood Pressure Normal",
    detail: "No abnormality detected",
    time: "Yesterday",
    level: "success",
  },
];

export const analysisTypes = [
  { id: "blood", label: "Blood Report", icon: HeartPulse, desc: "CBC, lipid panel, glucose and more." },
  { id: "image", label: "Medical Image", icon: ScanLine, desc: "X-ray, MRI, or CT scan analysis." },
  { id: "vitals", label: "Vital Signs", icon: Users, desc: "Heart rate, BP, SpO2 trends." },
  { id: "full", label: "Full Health Screening", icon: ShieldCheck, desc: "Comprehensive multi-disease scan." },
];

export const recentScans = [
  { id: 1, name: "Blood_Report_Aug.pdf", type: "Blood Report", date: "Aug 14, 2026", status: "Completed", risk: "Low" },
  { id: 2, name: "Chest_Xray.jpg", type: "Medical Image", date: "Aug 10, 2026", status: "Completed", risk: "Moderate" },
  { id: 3, name: "Vitals_Export.pdf", type: "Vital Signs", date: "Aug 03, 2026", status: "Completed", risk: "Low" },
  { id: 4, name: "Full_Screening_Jul.pdf", type: "Full Health Screening", date: "Jul 22, 2026", status: "Completed", risk: "Low" },
];

export const medicalHistory = [
  { id: 1, date: "Aug 14, 2026", title: "Blood Report Analysis", detail: "All markers within normal range.", level: "success" },
  { id: 2, date: "Aug 10, 2026", title: "Chest X-Ray Review", detail: "Minor irregularity flagged for lung region.", level: "warning" },
  { id: 3, date: "Jul 22, 2026", title: "Full Health Screening", detail: "Comprehensive screening completed, low overall risk.", level: "success" },
  { id: 4, date: "Jun 30, 2026", title: "Irregular Heart Rate Alert", detail: "Elevated resting heart rate detected over 3 days.", level: "danger" },
  { id: 5, date: "Jun 12, 2026", title: "Vitamin D Panel", detail: "Mild deficiency identified, supplementation suggested.", level: "warning" },
];

export const reportsList = [
  { id: 1, name: "Full Health Screening Report", date: "Aug 14, 2026", type: "PDF", risk: "Low" },
  { id: 2, name: "Chest X-Ray Analysis Report", date: "Aug 10, 2026", type: "PDF", risk: "Moderate" },
  { id: 3, name: "Quarterly Vitals Summary", date: "Aug 01, 2026", type: "PDF", risk: "Low" },
  { id: 4, name: "Blood Panel Report", date: "Jul 22, 2026", type: "PDF", risk: "Low" },
  { id: 5, name: "Cardiac Risk Assessment", date: "Jun 30, 2026", type: "PDF", risk: "Moderate" },
];

export const aiInsights = [
  {
    id: 1,
    title: "Lung risk trending upward",
    detail: "Moderate risk score increased 6% over the last 3 scans. Consider a follow-up pulmonary screening.",
    level: "warning",
  },
  {
    id: 2,
    title: "Cardiovascular markers stable",
    detail: "Heart disease risk has remained consistently low across the past 6 months of monitoring.",
    level: "success",
  },
  {
    id: 3,
    title: "Vitamin D pattern detected",
    detail: "Seasonal deficiency pattern identified. Model suggests recurring supplementation each winter.",
    level: "warning",
  },
  {
    id: 4,
    title: "Overall model confidence improving",
    detail: "Average analysis confidence rose to 94.7% as more longitudinal data becomes available.",
    level: "success",
  },
];

export const doctorsList = [
  { id: 1, name: "Dr. Ananya Rao", specialty: "Cardiologist", hospital: "City Heart Institute", rating: 4.9 },
  { id: 2, name: "Dr. Kabir Mehta", specialty: "Pulmonologist", hospital: "Lotus Respiratory Center", rating: 4.8 },
  { id: 3, name: "Dr. Priya Nair", specialty: "Endocrinologist", hospital: "MetroHealth Clinic", rating: 4.7 },
  { id: 4, name: "Dr. Arjun Malhotra", specialty: "General Physician", hospital: "Sunrise Medical Center", rating: 4.9 },
];

export const appointmentsList = [
  { id: 1, doctor: "Dr. Ananya Rao", specialty: "Cardiologist", date: "Aug 20, 2026", time: "10:30 AM", status: "Upcoming" },
  { id: 2, doctor: "Dr. Kabir Mehta", specialty: "Pulmonologist", date: "Aug 25, 2026", time: "2:00 PM", status: "Upcoming" },
  { id: 3, doctor: "Dr. Priya Nair", specialty: "Endocrinologist", date: "Jul 18, 2026", time: "11:00 AM", status: "Completed" },
  { id: 4, doctor: "Dr. Arjun Malhotra", specialty: "General Physician", date: "Jun 30, 2026", time: "9:15 AM", status: "Completed" },
];
