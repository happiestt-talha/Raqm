"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="section-px flex min-h-screen flex-col items-center justify-center text-center">
      <p className="label-mono text-accent">Error</p>
      <h1 className="text-hero mt-4 font-display uppercase">Something broke.</h1>
      <p className="mt-4 max-w-sm text-sm text-ink/70">
        That wasn&apos;t supposed to happen. Try again, or come back in a bit.
      </p>
      <button
        onClick={reset}
        className="label-mono mt-8 border border-ink bg-ink px-6 py-3 text-paper hover:bg-accent hover:border-accent"
      >
        Try again
      </button>
    </div>
  );
}