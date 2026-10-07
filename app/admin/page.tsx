import { AdminDashboard } from "@/components/admin/AdminDashboard";


export const metadata = {
  title: "Mindora Admin Console",
  description: "Administrative controls and system monitoring for Mindora.",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070a12] text-slate-900 dark:text-slate-100">
      <AdminDashboard />
    </div>
  );
}
