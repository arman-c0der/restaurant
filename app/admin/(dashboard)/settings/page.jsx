import { redirect } from "next/navigation";
import { getAccount } from "@/app/action/account.actions";
import ProfileForm from "@/components/admin/ProfileForm";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const account = await getAccount();
  if (!account) redirect("/admin/login");

  const since = account.createdAt
    ? new Date(account.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white">Settings</h1>
      <p className="mt-1 text-sm text-slate-400">
        Apnar account er information ar security.
      </p>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ProfileForm account={account} />

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="font-semibold text-white">Account info</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Role</dt>
                <dd className="font-medium capitalize text-amber-300">{account.role}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Member since</dt>
                <dd className="text-slate-200">{since}</dd>
              </div>
            </dl>
          </div>
        </div>

        <ChangePasswordForm />
      </div>
    </div>
  );
}