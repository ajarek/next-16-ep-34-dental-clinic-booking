import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Panel administratora - Klinika stomatologiczna",
  description: "Zarządzaj rezerwacjami, grafikiem i usługami kliniki stomatologicznej.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
