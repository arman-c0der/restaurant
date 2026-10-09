import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminLoginForm from "./components/AdminLoginForm";

export const metadata = {
  title: "Admin sign in",
};

export default async function AdminLoginPage() {
  const session = await auth();

  if (session?.user?.role === "admin") {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 pb-12 pt-28">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Admin sign in
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to manage reservations, menu and content.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}