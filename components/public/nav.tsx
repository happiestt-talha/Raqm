import Link from "next/link";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Nav() {
  return (
    <header className="section-px sticky top-0 z-50 flex items-center justify-between border-b border-border bg-paper/90 py-5 backdrop-blur-sm">
      <Link href="/" className="font-mono text-sm font-medium tracking-wide">
        M/TALHA
      </Link>

      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="label-mono text-ink transition-colors hover:text-accent"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile menu trigger — expand with a client component + slide-out panel when needed */}
      <button
        className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        aria-label="Open menu"
      >
        <span className="h-px w-6 bg-ink" />
        <span className="h-px w-6 bg-ink" />
      </button>
    </header>
  );
}