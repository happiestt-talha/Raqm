"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="section-px sticky top-0 z-50 flex items-center justify-between border-b border-border bg-paper/90 py-5 backdrop-blur-sm">
      <Link href="/" className="font-mono text-sm font-medium tracking-wide" onClick={() => setOpen(false)}>
        M/TALHA
      </Link>

      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="label-mono text-ink transition-colors hover:text-accent">
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span className={`h-px w-6 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
        <span className={`h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
      </button>

      {/* Slide-out panel — fixed overlay, doesn't affect layout/CLS since it's position: fixed */}
      <div
        className={`fixed inset-0 z-40 bg-paper transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex h-full flex-col items-start justify-center gap-8 px-8" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-h2 font-display uppercase text-ink hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}