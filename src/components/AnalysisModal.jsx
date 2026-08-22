import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { apiRequest } from "../api";

const initialForm = {
  Temperature: "37.5",
  Age: "22",
  BMI: "22.5",
  Gender: "Male",
  Headache: "Yes",
  Body_Ache: "No",
  Fatigue: "Yes",
  Chronic_Conditions: "No",
  Allergies: "No",
  Smoking_History: "No",
  Alcohol_Consumption: "No",
  Humidity: "60",
  AQI: "100",
  Physical_Activity: "Moderate",
  Diet_Type: "Vegetarian",
  Heart_Rate: "90",
  Blood_Pressure: "Normal",
};

export default function AnalysisModal({ open, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [stage, setStage] = useState("form");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClose = () => {
    onClose();

    setTimeout(() => {
      setStage("form");
      setResult(null);
      setError("");
      setForm(initialForm);
    }, 300);
  };

  const handleAnalyze = async () => {
    setStage("processing");
    setError("");

    try {
      const payload = {
        Temperature: Number(form.Temperature),
        Age: Number(form.Age),
        BMI: Number(form.BMI),

        Gender: form.Gender,
        Headache: form.Headache,
        Body_Ache: form.Body_Ache,
        Fatigue: form.Fatigue,

        Chronic_Conditions: form.Chronic_Conditions,
        Allergies: form.Allergies,
        Smoking_History: form.Smoking_History,
        Alcohol_Consumption: form.Alcohol_Consumption,

        Humidity: Number(form.Humidity),
        AQI: Number(form.AQI),

        Physical_Activity: form.Physical_Activity,
        Diet_Type: form.Diet_Type,

        Heart_Rate: Number(form.Heart_Rate),
        Blood_Pressure: form.Blood_Pressure,
      };

      const data = await apiRequest("/api/predict-fever", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setResult(data);
      setStage("done");
    } catch (err) {
      console.error("Fever prediction error:", err);
      setError(err.message || "Unable to analyze the health data.");
      setStage("form");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-[13px] text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  const labelClass =
    "mb-1.5 block text-[11.5px] font-semibold text-navy";

  const SelectField = ({ label, field, options }) => (
    <div>
      <label className={labelClass}>{label}</label>
      <select
        value={form[field]}
        onChange={(e) => updateField(field, e.target.value)}
        className={inputClass}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const TextField = ({ label, field, type = "text" }) => (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={(e) => updateField(field, e.target.value)}
        className={inputClass}
      />
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl2 bg-white p-6 shadow-hero"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[17px] font-semibold text-navy">
                {stage === "done"
                  ? "Fever Analysis Complete"
                  : "AI Fever Screening"}
              </h3>

              <button
                onClick={handleClose}
                className="text-muted transition hover:text-navy"
              >
                <X size={18} />
              </button>
            </div>

            {stage === "form" && (
              <>
                <p className="mt-1 text-[12px] text-muted">
                  Enter patient vitals and symptoms for ML-based fever
                  screening.
                </p>

                {error && (
                  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[12px] text-red-700">
                    {error}
                  </div>
                )}

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <TextField
                    label="Temperature (°C)"
                    field="Temperature"
                    type="number"
                  />

                  <TextField
                    label="Age"
                    field="Age"
                    type="number"
                  />

                  <TextField
                    label="BMI"
                    field="BMI"
                    type="number"
                  />

                  <TextField
                    label="Heart Rate"
                    field="Heart_Rate"
                    type="number"
                  />

                  <TextField
                    label="Humidity"
                    field="Humidity"
                    type="number"
                  />

                  <TextField
                    label="AQI"
                    field="AQI"
                    type="number"
                  />

                  <SelectField
                    label="Gender"
                    field="Gender"
                    options={["Male", "Female"]}
                  />

                  <SelectField
                    label="Blood Pressure"
                    field="Blood_Pressure"
                    options={["Normal", "High", "Low"]}
                  />

                  <SelectField
                    label="Headache"
                    field="Headache"
                    options={["Yes", "No"]}
                  />

                  <SelectField
                    label="Body Ache"
                    field="Body_Ache"
                    options={["Yes", "No"]}
                  />

                  <SelectField
                    label="Fatigue"
                    field="Fatigue"
                    options={["Yes", "No"]}
                  />

                  <SelectField
                    label="Chronic Conditions"
                    field="Chronic_Conditions"
                    options={["Yes", "No"]}
                  />

                  <SelectField
                    label="Allergies"
                    field="Allergies"
                    options={["Yes", "No"]}
                  />

                  <SelectField
                    label="Smoking History"
                    field="Smoking_History"
                    options={["Yes", "No"]}
                  />

                  <SelectField
                    label="Alcohol Consumption"
                    field="Alcohol_Consumption"
                    options={["Yes", "No"]}
                  />

                  <SelectField
                    label="Physical Activity"
                    field="Physical_Activity"
                    options={["Active", "Moderate", "Sedentary"]}
                  />

                  <SelectField
                    label="Diet Type"
                    field="Diet_Type"
                    options={["Vegan", "Vegetarian", "Non-Vegetarian"]}
                  />
                </div>

                <button
                  onClick={handleAnalyze}
                  className="mt-6 w-full rounded-lg bg-primary py-3 text-[13.5px] font-semibold text-white transition hover:bg-primary-dark"
                >
                  Analyze with AI
                </button>
              </>
            )}

            {stage === "processing" && (
              <div className="flex flex-col items-center py-16 text-center">
                <Loader2
                  size={32}
                  className="animate-spin text-primary"
                />

                <p className="mt-4 text-[14px] font-medium text-navy">
                  Running ML fever analysis...
                </p>

                <p className="mt-1 text-[12px] text-muted">
                  Analyzing symptoms and vital signs.
                </p>
              </div>
            )}

            {stage === "done" && result && (
              <div className="py-6">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle2
                      size={28}
                      className="text-success"
                    />
                  </div>

                  <p className="mt-4 text-[18px] font-semibold text-navy">
                    {result.prediction.severity}
                  </p>

                  <p className="mt-1 text-[13px] text-muted">
                    ML screening result
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border bg-bg p-4">
                    <p className="text-[11px] text-muted">
                      Risk Level
                    </p>
                    <p className="mt-1 text-[16px] font-bold text-navy">
                      {result.prediction.risk_level}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-bg p-4">
                    <p className="text-[11px] text-muted">
                      Confidence
                    </p>
                    <p className="mt-1 text-[16px] font-bold text-navy">
                      {result.prediction.confidence}%
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-border p-4">
                  <p className="text-[12px] font-semibold text-navy">
                    Class Probabilities
                  </p>

                  <div className="mt-3 space-y-2">
                    {Object.entries(result.probabilities).map(
                      ([name, value]) => (
                        <div
                          key={name}
                          className="flex items-center justify-between text-[12px]"
                        >
                          <span className="text-muted">
                            {name}
                          </span>

                          <span className="font-semibold text-navy">
                            {value}%
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <p className="mt-5 text-center text-[11px] leading-5 text-muted">
                  {result.disclaimer}
                </p>

                <button
                  onClick={handleClose}
                  className="mt-5 w-full rounded-lg border border-border py-2.5 text-[13px] font-medium text-navy transition hover:bg-bg"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
