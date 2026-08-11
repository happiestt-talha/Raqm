type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  bullets: string[];
};

function formatRange(start: Date, end: Date | null) {
  const fmt = (d: Date) => new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(d);
  return `${fmt(start)} — ${end ? fmt(end) : "Present"}`;
}

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <section id="experience" className="section-px section-py border-t border-border">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr]">
        <div className="flex items-start gap-4">
          <span className="text-section-num font-display text-accent">02</span>
          <div>
            <h2 className="text-h2 font-display uppercase">Experience</h2>
            <p className="mt-2 max-w-xs text-sm text-ink/70">
              Places I&apos;ve worked and things I&apos;ve built.
            </p>
          </div>
        </div>

        <ol className="relative flex flex-col gap-0 border-l border-border pl-8 sm:pl-10">
          {items.map((item) => (
            <li key={item.id} className="relative border-b border-border py-8 first:pt-0 last:border-b-0">
              <span
                className="absolute -left-[calc(2rem+4.5px)] top-9 h-2.5 w-2.5 rounded-full bg-accent sm:-left-[calc(2.5rem+4.5px)]"
                aria-hidden
              />
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                <h3 className="text-h3 font-display uppercase">
                  {item.company}
                  <span className="ml-3 font-body text-sm font-normal normal-case text-ink/60">
                    {item.role}
                  </span>
                </h3>
                <p className="label-mono shrink-0 text-muted">{formatRange(item.startDate, item.endDate)}</p>
              </div>
              {item.location && <p className="label-mono mt-1 text-muted">{item.location}</p>}
              <ul className="mt-4 flex flex-col gap-2">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}