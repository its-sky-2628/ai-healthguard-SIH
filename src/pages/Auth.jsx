import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { loginUser, registerUser, saveAuth } from "../api";

export default function Auth({ onSuccess, onBack }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (mode === "signup") {
      if (!form.name.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (form.password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    try {
      setLoading(true);

      let result;

      if (mode === "login") {
        result = await loginUser(form.email, form.password);
      } else {
        result = await registerUser({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          dateOfBirth: form.dateOfBirth || null,
          gender: form.gender,
        });

        /*
         * If register endpoint doesn't return a token,
         * automatically login after successful signup.
         */
        if (!result.token) {
          result = await loginUser(form.email, form.password);
        }
      }

      saveAuth(result);

      onSuccess(result.user);
    } catch (err) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-muted transition hover:text-navy"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </button>

        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-xl shadow-navy/[0.05]">

          <div className="bg-gradient-to-br from-primary to-ai px-7 py-8 text-white">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <ShieldCheck size={27} />
            </div>

            <h1 className="font-display text-2xl font-bold">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>

            <p className="mt-2 text-sm text-white/75">
              {mode === "login"
                ? "Sign in to continue to AI HealthGuard."
                : "Start your personalized health journey with AI HealthGuard."}
            </p>
          </div>

          <div className="p-7">

            <div className="mb-6 grid grid-cols-2 rounded-lg bg-bg p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
                className={`rounded-md py-2 text-sm font-semibold transition ${
                  mode === "login"
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError("");
                }}
                className={`rounded-md py-2 text-sm font-semibold transition ${
                  mode === "signup"
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4">

              {mode === "signup" && (
                <>
                  <Field
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder="Enter your full name"
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Phone"
                      name="phone"
                      value={form.phone}
                      onChange={updateField}
                      placeholder="Phone number"
                    />

                    <Field
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      value={form.dateOfBirth}
                      onChange={updateField}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[12px] font-semibold text-navy">
                      Gender
                    </label>

                    <select
                      name="gender"
                      value={form.gender}
                      onChange={updateField}
                      className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </>
              )}

              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
              />

              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-navy">
                  Password
                </label>

                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={updateField}
                    placeholder="Enter password"
                    className="w-full rounded-lg border border-border bg-white px-3 py-2.5 pr-10 text-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {mode === "signup" && (
                <Field
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={updateField}
                  placeholder="Confirm password"
                />
              )}

              {error && (
                <div className="rounded-lg border border-danger/20 bg-danger/5 px-3 py-2.5 text-sm text-danger">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Please wait..."
                  : mode === "login"
                  ? "Login to AI HealthGuard"
                  : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-muted">
              Your health data is handled securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-semibold text-navy">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
      />
    </div>
  );
}
