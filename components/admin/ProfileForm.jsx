"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { updateProfile } from "@/app/action/account.actions";

const inputCls =
  "w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none";
const labelCls = "mb-1.5 block text-sm font-medium text-slate-300";

export default function ProfileForm({ account }) {
  const [email, setEmail] = useState(account.email);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [pending, startTransition] = useTransition();

  const emailChanged = email.trim().toLowerCase() !== account.email;

  function onSubmit(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updateProfile(fd);
      if (res?.ok) {
        setMsg({ type: "ok", text: "Profile update hoyeche." });
      } else if (res?.error) {
        setMsg({ type: "err", text: res.error });
      }
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6"
    >
      <h2 className="font-semibold text-white">Profile</h2>

      <div>
        <label htmlFor="name" className={labelCls}>Name</label>
        <input id="name" name="name" required defaultValue={account.name} className={inputCls} />
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
        />
      </div>

      {emailChanged && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <label htmlFor="profile-current" className={labelCls}>
            Current password (email change korar jonno)
          </label>
          <input
            id="profile-current"
            name="current"
            type="password"
            required
            autoComplete="current-password"
            className={inputCls}
          />
          <p className="mt-2 text-xs text-amber-300">
            Email change korle apni sign out hoye jaben, notun email diye abar login korte hobe.
          </p>
        </div>
      )}

      {msg.text && (
        <p
          role="alert"
          className={`rounded-lg border px-4 py-2.5 text-sm ${
            msg.type === "ok"
              ? "border-emerald-700 bg-emerald-950 text-emerald-400"
              : "border-red-500/40 bg-red-500/10 text-red-400"
          }`}
        >
          {msg.text}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-60"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}