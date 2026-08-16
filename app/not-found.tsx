import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-px flex min-h-screen flex-col items-center justify-center text-center">
      <p className="label-mono text-accent">404</p>
      <h1 className="text-hero mt-4 font-display uppercase">Not found.</h1>
      <p className="mt-4 max-w-sm text-sm text-ink/70">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="label-mono mt-8 border-b border-accent pb-0.5 text-accent hover:opacity-70"
      >
        Back to home ↗
      </Link>
    </div>
  );
}