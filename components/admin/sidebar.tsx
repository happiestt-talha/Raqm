"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/settings", label: "Settings" }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col justify-between border-r border-border bg-paper px-5 py-6">
      <div>
        <p className="font-mono text-sm">RAQM</p>
        <nav className="mt-10 flex flex-col gap-1" aria-label="Admin">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`label-mono rounded-sm px-3 py-2 transition-colors ${
                  active ? "bg-ink text-paper" : "text-ink/60 hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <form action={logout}>
        <button type="submit" className="label-mono text-ink/50 hover:text-accent">
          Sign out
        </button>
      </form>
    </aside>
  );
}