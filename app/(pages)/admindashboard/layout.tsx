"use client";

import AdminHeader from "@/app/Components/AdminHeader";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminHeader />
      <main>{children}</main>
    </div>
  );
}
