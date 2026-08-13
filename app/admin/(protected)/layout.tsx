import { Sidebar } from "@/components/admin/sidebar";

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-paper font-body text-ink">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-10 py-8">{children}</main>
    </div>
  );
}