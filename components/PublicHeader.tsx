import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { Smile } from "lucide-react";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <Smile className="h-6 w-6 text-primary" />
          <span>DentClinic</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-sm font-medium  transition hover:text-foreground">
            Panel Admina
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
