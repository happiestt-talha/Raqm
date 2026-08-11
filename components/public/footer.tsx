export function Footer() {
  return (
    <footer className="section-px flex flex-col items-start justify-between gap-4 border-t border-border py-6 sm:flex-row sm:items-center">
      <p className="font-mono text-sm">M/TALHA</p>
      <p className="label-mono text-muted">© {new Date().getFullYear()} All rights reserved.</p>
      <p className="label-mono text-muted">Built with Next.js & Tailwind CSS</p>
    </footer>
  );
}