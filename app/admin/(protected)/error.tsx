"use client";

export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-start gap-4">
      <p className="label-mono text-accent">Something went wrong</p>
      <p className="text-sm text-ink/70">The action failed. Check your connection or try again.</p>
      <button
        onClick={reset}
        className="label-mono border border-ink bg-ink px-4 py-2 text-paper hover:bg-accent hover:border-accent"
      >
        Try again
      </button>
    </div>
  );
}