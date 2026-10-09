"use client";

import { useRef, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { changePassword } from "@/app/action/account.actions";

const inputCls =
  "w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none";
const labelCls = "mb-1.5 block text-sm font-medium text-slate-300";

export default function ChangePasswordForm() {
  const formRef = useRef(null);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [pending, startTransition] = useTransition();

  function onSubmit(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await changePassword(fd);
      if (res?.ok) {
        setMsg({ type: "ok", text: "Password change hoyeche." });
        formRef.current?.reset();
      } else {
        setMsg({ type: "err", text: res?.error || "Kichu ekta vul hoyeche." });
      }
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="h-fit space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6"
    >
      <h2 className="font-semibold text-white">Change Password</h2>

      <div>
        <label htmlFor="cp-current" className={labelCls}>
          Current password
        </label>
        <input
          id="cp-current"
          name="current"
          type="password"
          required
          autoComplete="current-password"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="cp-next" className={labelCls}>
          New password
        </label>
        <input
          id="cp-next"
          name="next"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputCls}
        />
        <p className="mt-1.5 text-xs text-slate-500">Minimum 8 character.</p>
      </div>

      <div>
        <label htmlFor="cp-confirm" className={labelCls}>
          Confirm new password
        </label>
        <input
          id="cp-confirm"
          name="confirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputCls}
        />
      </div>

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
        className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? "Saving..." : "Update Password"}
      </button>
    </form>
  );
}