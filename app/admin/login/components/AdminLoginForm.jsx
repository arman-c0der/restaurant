"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-5 w-5",
  "aria-hidden": true,
};

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg {...iconProps}>
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function EyeIcon({ off }) {
  return (
    <svg {...iconProps}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="m4 4 16 16" />}
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function inputClass(hasError, extra = "") {
  return [
    "w-full rounded-xl border bg-slate-950/80 py-3 pl-11 pr-4 text-sm text-white",
    "placeholder:text-slate-500 transition",
    "focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
    hasError
      ? "border-red-500/60 focus:border-red-400 focus:ring-red-400/25"
      : "border-white/10 hover:border-white/20 focus:border-amber-400 focus:ring-amber-400/25",
    extra,
  ].join(" ");
}

export default function AdminLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const errors = {};
    if (!email.trim()) errors.email = "Enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      errors.email = "Enter a valid email address.";
    if (!password) errors.password = "Enter your password.";
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("The email or password is incorrect. Check them and try again.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Could not sign in. Check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          <svg {...iconProps} className="mt-0.5 h-5 w-5 shrink-0">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5M12 16.5v.01" />
          </svg>
          <p>{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
          Email
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
            <MailIcon />
          </span>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@restaurant.com"
            disabled={loading}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={inputClass(!!fieldErrors.email)}
          />
        </div>
        {fieldErrors.email && (
          <p id="email-error" className="mt-1.5 text-sm text-red-400">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
          Password
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
            <LockIcon />
          </span>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={loading}
            aria-invalid={!!fieldErrors.password}
            aria-describedby={fieldErrors.password ? "password-error" : undefined}
            className={inputClass(!!fieldErrors.password, "pr-12")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center rounded-r-xl px-3.5 text-slate-500 transition hover:text-slate-200 focus-visible:text-amber-400 focus-visible:outline-none"
          >
            <EyeIcon off={showPassword} />
          </button>
        </div>
        {fieldErrors.password && (
          <p id="password-error" className="mt-1.5 text-sm text-red-400">
            {fieldErrors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Spinner />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
}