import { LocalTime } from "./local-time";

const stack = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"];

type HeroProps = {
  headline: string;
  subtext: string;
  availability: string;
};

export function Hero({ headline, subtext, availability }: HeroProps) {
  return (
    <section className="section-px pt-12 pb-16 md:pt-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto]">
        {/* Left column — intro + CTA */}
        <div className="flex flex-col justify-between gap-10">
          <div className="max-w-xs">
            <p className="label-mono text-muted">Software Engineer</p>
            <p className="label-mono text-muted">Based in Lahore, Pakistan.</p>
            <p className="mt-6 text-sm leading-relaxed text-ink/80">{subtext}</p>

            <a
              href="mailto:hello@mtalha.me"
              className="label-mono mt-6 inline-block border-b border-accent pb-0.5 text-accent transition-opacity hover:opacity-70"
            >
              Let&apos;s connect ↗
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-accent" aria-hidden />
            <p className="label-mono text-muted">{availability}</p>
          </div>
        </div>

        {/* Right column — info panel, fixed structure so it never shifts */}
        <dl className="grid w-full grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:w-72 lg:grid-cols-1">
          <div className="flex flex-col justify-center bg-paper px-5 py-4">
            <dt className="label-mono text-muted">Local time</dt>
            <dd className="mt-1"><LocalTime /></dd>
          </div>
          <div className="flex flex-col justify-center bg-paper px-5 py-4">
            <dt className="label-mono text-muted">Location</dt>
            <dd className="mt-1 font-mono text-sm">Lahore, Pakistan</dd>
          </div>
          <div className="flex flex-col justify-center bg-paper px-5 py-4">
            <dt className="label-mono text-muted">Timezone</dt>
            <dd className="mt-1 font-mono text-sm">GMT +5</dd>
          </div>
        </dl>
      </div>

      {/* Headline — the thesis */}
      <h1 className="text-hero mt-14 font-display uppercase text-ink">
        {headline.split(" ").map((word, i, arr) => (
          <span key={i}>
            {word}
            {i === arr.length - 1 ? <span className="text-accent">.</span> : " "}
          </span>
        ))}
      </h1>

      {/* Tech marquee line */}
      <div className="mt-12 flex flex-wrap items-center gap-3 border-y border-border py-4">
        {stack.map((tech, i) => (
          <span key={tech} className="flex items-center gap-3">
            <span className="label-mono text-ink/70">{tech}</span>
            {i < stack.length - 1 && <span className="text-muted" aria-hidden>•</span>}
          </span>
        ))}
      </div>
    </section>
  );
}